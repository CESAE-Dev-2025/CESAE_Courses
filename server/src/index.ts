import 'dotenv/config';

import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {rateLimiter} from "hono-rate-limiter";
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "./db/schema";
import {job, scheduleScraper} from "./cronJob";
import {customLogger} from "./CustomLogger";

const app = new Hono()

const db = drizzle(process.env.DATABASE_URL!);

app.use(cors())

app.use(
    rateLimiter({
        windowMs: 60 * 1000,                                                                  // 1 minuto (60 * 1000 ms)
        limit: 10,                                             // Limita cada cliente à 10 requests por período (window)
        keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Usa o IP como key
    })
);

app.use(logger())

scheduleScraper();

// TODO: Proteger este endpoint (token, JWT, IP whitelist, etc.)
app.post('/admin/run-scrape', async c => {
    customLogger("INFO", "Scrape started by admin request...")

    job?.trigger();

    return c.json({ status: 'ok', message: 'Scrape started successfully.' });
});

// TODO: Proteger este endpoint (token, JWT, IP whitelist, etc.)
app.get('/admin/scrape-job-info', async c => {
    customLogger("INFO", "Scrape info requested by admin...")

    const jobData = {
        lastRun: job?.currentRun(),
        nextRun: job?.nextRun(),
        isActive: job?.isStopped()
    }

    return c.json({ data: jobData, status: 'ok' });
});

app.get('/courses', async (c) => {
    try {
        const data = await db.select().from(courses);

        // await db.delete(courses);
        // await db.insert(courses).values(data);

        customLogger("INFO", `Getting ${data.length} courses from the database.`)
        return c.json(data, {status: 200})

    } catch (error) {
        customLogger('ERROR', 'Error fetching courses:', error as string);
        return c.json({error: 'Internal Server Error'}, {status: 500});
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

export default {
    fetch: app.fetch,
    idleTimeout: 15
}
