import 'dotenv/config';

import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {rateLimiter} from "hono-rate-limiter";
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "./db/schema";
import {eq} from "drizzle-orm";
import * as console from "node:console";

const app = new Hono()

const db = drizzle(process.env.DATABASE_URL!);
const logDate = () => new Date()
    .toISOString()
    .replace('Z', '')
    .replace('T', ' ')

export const customLogger = (logType: string, message: string, ...rest: string[]) => {
    logType = logType.toUpperCase()
    if (logType === 'ERROR') {
        console.error(`${logDate()} | ${logType}:`, message, ...rest)
    } else {
        console.log(`${logDate()} | ${logType}:`, message, ...rest)
    }
}

app.use(cors())

app.use(
    rateLimiter({
        windowMs: 60 * 1000,                                                                  // 1 minuto (60 * 1000 ms)
        limit: 10,                                             // Limita cada cliente à 10 requests por período (window)
        keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Usa o IP como key
    })
);

app.use(logger())

app.get('/courses', async (c) => {
    try {
        const data = await db.select().from(courses);

        // await db.delete(courses);
        // await db.insert(courses).values(data);

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
