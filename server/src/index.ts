import {Hono} from 'hono'
import {cors} from 'hono/cors'
import type {ApiResponse} from 'shared/dist'
import { jsonCourses } from "./data/jsonCourses";


const app = new Hono()

app.use(cors())

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.get('/hello', async (c) => {

    const data: ApiResponse = {
        message: "Bazinga!",
        success: true
    }

    return c.json(data, {status: 200})
})

app.get('/courses', async (c) => {
    // TODO: Buscar cursos da BD
    return c.json(jsonCourses, {status: 200})
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
