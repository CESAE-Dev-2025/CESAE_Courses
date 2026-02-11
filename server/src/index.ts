import 'dotenv/config';

import {Hono} from 'hono'
import {jwt, sign} from 'hono/jwt'
import type {JwtVariables} from 'hono/jwt'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {rateLimiter} from "hono-rate-limiter";
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "./db/schema";
import {job, scheduleScraper} from "./cronJob";
import {runScrapeAndSave} from "./scraper";
import {customLogger} from "./CustomLogger";

type Variables = JwtVariables

// const app = new Hono()
const app = new Hono<{ Variables: Variables }>()

const db = drizzle(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET!;

app.use(cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use(
    rateLimiter({
        windowMs: 60 * 1000,                                                                  // 1 minuto (60 * 1000 ms)
        limit: 10,                                             // Limita cada cliente à 10 requests por período (window)
        keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Usa o IP como key
    })
);

app.use(logger())

app.use(
    '/admin/*',
    jwt({
        secret: JWT_SECRET,
        alg: 'HS256',
    })
)

scheduleScraper();

app.get('/auth/page', (c) => {
    return c.text('You are authorized')
})

app.post('/auth/login', async (c) => {
    const {username, password} = await c.req.json()

    if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
        return c.json({error: 'Invalid credentials'}, {status: 401})
    }

    const token = await sign(
        {
            sub: username,
            role: 'admin',
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        JWT_SECRET
    )

    return c.json({token})
})

app.post('/auth/logout', (c) => {
    return c.json({ok: true})
})

app.get(
    '/auth/me',
    jwt({
        secret: JWT_SECRET,
        alg: 'HS256',
    }),
    (c) => {
        return c.json({ok: true})
    }
)

app.post('/admin/run-scrape', async c => {
    customLogger("INFO", "Scrape started by admin request...")

    job?.trigger();

    return c.json({status: 'ok', message: 'Scrape started successfully.'});
});

app.get('/admin/scrape-job-info', async c => {
    customLogger("INFO", "Scrape info requested by admin...")

    const jobData = {
        lastRun: job?.currentRun(),
        nextRun: job?.nextRun(),
        isActive: job?.isStopped()
    }

    return c.json({data: jobData, status: 'ok'});
});

app.get('/courses', async (c) => {
    try {
        const data = await db.select().from(courses);

        customLogger("INFO", `Getting ${data.length} courses from the database.`)
        return c.json(data, {status: 200})

    } catch (error) {
        customLogger('ERROR', 'Error fetching courses:', error as string);
        return c.json({error: 'Internal Server Error HA'}, {status: 500});
    }
})

// app.get('/courses/:id', async (c) => {
//     const id = Number(c.req.param('id'))
//     const course = await db.select().from(courses).where(eq(courses.id, id));
//
//     if (course[0] !== undefined) {
//         customLogger('INFO', `Getting course id ${id} data from the database.`)
//         return c.json(course, {status: 200})
//     }
//
//     customLogger('ERROR', `Course ${id} not found.`)
//     return c.json({error: 'Course not found'}, {status: 404})
// })

export default app
