import 'dotenv/config';

import {Hono} from 'hono'
import {cors} from 'hono/cors'
import { drizzle } from 'drizzle-orm/mysql2';
import {coursesTable} from "./db/schema";

const app = new Hono()

const db = drizzle(process.env.DATABASE_URL!);

app.use(cors())

app.get('/courses', async (c) => {
    try {
        const courses = await db.select().from(coursesTable);
        console.log('Getting all courses from the database: ', courses.length)
        return c.json(courses, {status: 200})
    } catch (error) {
        console.error('Error fetching courses:', error);
        return c.json({ error: 'Internal Server Error' }, { status: 500 });
    }
})

// app.get('/courses/:id', async (c) => {
//     const id = c.req.param('id')
//     const course = courses.find(course => course.id.toString() === id)
//
//     if (id == course?.id.toString()){
//         return c.json(course, {status: 200})
//     }
//
//     return c.json(null, {status: 404})
// })

export default app
