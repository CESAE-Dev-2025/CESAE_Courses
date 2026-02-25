import {Hono} from 'hono'
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "../db/schema";
import {customLogger} from "../CustomLogger";

const db = drizzle(process.env.DATABASE_URL!);

const coursesRoute = new Hono()

coursesRoute.get('/', async (c) => {
    try {
        const data = await db.select().from(courses);

        customLogger("INFO", `Getting ${data.length} courses from the database.`)
        return c.json(data, {status: 200})

    } catch (error) {
        customLogger('ERROR', 'Error fetching courses:', error as string);
        return c.json({error: 'Internal Server Error'}, {status: 500});
    }
})

export default coursesRoute;
