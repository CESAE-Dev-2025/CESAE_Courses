import {Hono} from 'hono'
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "../db/schema";
import {customLogger} from "../CustomLogger";

const db = drizzle(process.env.DATABASE_URL!);

const coursesRoute = new Hono()

coursesRoute.get('/', async (c) => {
    try {
        const data = await db.select().from(courses);

        customLogger("INFO", `Recuperando ${data.length} cursos da base de dados.`)
        return c.json(data, {status: 200})

    } catch (error) {
        customLogger('ERROR', 'Erro recuperando cursos:', error as string);
        return c.json({error: 'Erro interno do servidor'}, {status: 500});
    }
})

export default coursesRoute;
