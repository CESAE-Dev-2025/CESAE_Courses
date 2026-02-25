import {Hono} from 'hono'
import {jwt} from 'hono/jwt'
import type {JwtVariables} from 'hono/jwt'
import {job, scheduleScraper} from "../cronJob";
import {customLogger} from "../CustomLogger";
import type {JobInfo} from "shared";
import {drizzle} from "drizzle-orm/mysql2";
import {users} from "../db/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcryptjs";

const db = drizzle(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET!;

const admin = new Hono<{ Variables: JwtVariables }>()

admin.use(
    '/*',
    jwt({
        secret: JWT_SECRET,
        alg: 'HS256',
    })
)

admin.post('/run-scrape', async c => {
    customLogger("INFO", "Scrape started by admin request...")

    job?.trigger();

    return c.json({status: 'ok', message: 'Scrape started successfully.'});
});

admin.get('/scrape-job-info', async c => {
    customLogger("INFO", "Scrape info requested by admin...")

    if (!job) {
        return scheduleScraper();
    }

    const jobData: JobInfo = {
        lastRun: job.currentRun(),
        nextRun: job.nextRun(),
        isRunning: job.isRunning(),
        isStopped: job.isStopped(),
        isBusy: job.isBusy(),
    }

    return c.json({data: jobData, status: 'ok'});
});

admin.get('/users', async (c) => {
    const allUsers = await db.select({
        id: users.id,
        username: users.username,
        role: users.role,
    }).from(users);
    return c.json(allUsers);
});

admin.post('/users', async (c) => {
    const {username, password} = await c.req.json();
    
    if (!username || !password) {
        return c.json({error: 'Username and password are required'}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await db.insert(users).values({
            username,
            password: hashedPassword,
            role: 'admin',
        });
        return c.json({status: 'ok', message: 'User created successfully'});
    } catch (error) {
        return c.json({error: 'User already exists or database error'}, {status: 400});
    }
});

admin.post('/change-password', async (c) => {
    const {newPassword} = await c.req.json();
    const payload = c.get('jwtPayload');
    const username = payload.sub;

    if (!newPassword) {
        return c.json({error: 'New password is required'}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db.update(users)
        .set({password: hashedPassword})
        .where(eq(users.username, username));

    return c.json({status: 'ok', message: 'Password updated successfully'});
});

export default admin;
