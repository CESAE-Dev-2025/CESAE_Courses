import 'dotenv/config';

import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {rateLimiter} from "hono-rate-limiter";
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "./db/schema";
import {job, scheduleScraper} from "./cronJob";
import {customLogger} from "./CustomLogger";
import {serve} from '@hono/node-server'

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
    customLogger("INFO", "Scrape requested by admin...")

    job?.trigger();

    return c.json({ status: 'ok', message: 'Scrape started successfully.' });
});

// TODO: Proteger este endpoint (token, JWT, IP whitelist, etc.)
app.get('/admin/scrape-job-status', async c => {
    customLogger("INFO", "Scrape requested by admin...")

    const isActive = job?.isStopped() ? "inactive" : "active";

    return c.json({ data: isActive, status: 'ok', message: 'Scrape iniciado' });
});

app.get('/courses', async (c) => {
    try {
        const data = await db.select().from(courses);

        await db.delete(courses);
        await db.insert(courses).values(data);

        customLogger("INFO", `Getting ${data.length} courses from the database.`)
        return c.json(data, {status: 200})

    } catch (error) {
        customLogger('ERROR', 'Error fetching courses:', error as string);
        return c.json({error: 'Internal Server Error HA'}, {status: 500});
    }
})

const port = Number(process.env.PORT) || 3000

customLogger("INFO", `Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})

export default app
