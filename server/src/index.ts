import 'dotenv/config';

import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {rateLimiter} from "hono-rate-limiter";
import {scheduleScraper} from "./cronJob";
import auth from "./routes/auth";
import admin from "./routes/admin";
import coursesRoute from "./routes/courses";

const app = new Hono()

app.use(cors({
    origin: (origin) => origin, // Permite qualquer origem mantendo as credenciais
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

app.use(
    rateLimiter({
        windowMs: 60 * 1000,                                                                  // 1 minuto (60 * 1000 ms)
        limit: 10,                                             // Limita cada cliente à 10 requests por período (window)
        keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Usa o IP como key
    })
);

app.use(logger())

scheduleScraper();

app.route('/auth', auth)
app.route('/admin', admin)
app.route('/courses', coursesRoute)

export default app
