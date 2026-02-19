import 'dotenv/config';

import {Hono} from 'hono'
import {jwt, sign, verify} from 'hono/jwt'
import type {JwtVariables} from 'hono/jwt'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import {setCookie, getCookie, deleteCookie} from 'hono/cookie'
import {rateLimiter} from "hono-rate-limiter";
import {drizzle} from 'drizzle-orm/mysql2';
import {courses} from "./db/schema";
import {job, scheduleScraper} from "./cronJob";
import {customLogger} from "./CustomLogger";

type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

const db = drizzle(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_TTL_SECONDS = Number(process.env.JWT_TTL_SECONDS ?? 600) // 10m padrão
const REFRESH_TOKEN_TTL_SECONDS = Number(process.env.REFRESH_TOKEN_TTL_SECONDS ?? 604800) // 7 dias padrão

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

app.use(
    '/admin/*',
    jwt({
        secret: JWT_SECRET,
        alg: 'HS256',
    })
)

scheduleScraper();

app.get('/auth/me',
    jwt({
        secret: JWT_SECRET,
        alg: 'HS256',
    }),
    (c) => {
        return c.json({ok: true})
    }
)

app.get('/auth/page', (c) => {
    return c.text('You are authorized')
})

app.post('/auth/login', async (c) => {
    const {username, password} = await c.req.json()

    if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
        return c.json({error: 'Invalid credentials'}, {status: 401})
    }

    const now = Math.floor(Date.now() / 1000)
    const token = await sign(
        {
            sub: username,
            role: 'admin',
            iat: now,
            exp: now + JWT_TTL_SECONDS,
        },
        JWT_SECRET
    )

    const refreshToken = await sign(
        {
            sub: username,
            type: 'refresh',
            iat: now,
            exp: now + REFRESH_TOKEN_TTL_SECONDS,
        },
        JWT_SECRET
    )

    setCookie(c, 'refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: REFRESH_TOKEN_TTL_SECONDS,
        path: '/auth/refresh', // Só enviado para a rota de refresh por segurança
    })

    return c.json({token})
})

app.post('/auth/refresh', async (c) => {
    const refreshToken = getCookie(c, 'refresh_token')

    if (!refreshToken) {
        return c.json({error: 'Refresh token missing'}, {status: 401})
    }

    try {
        const payload = await verify(refreshToken, JWT_SECRET, { alg: 'HS256' })

        if (payload.type !== 'refresh') {
            return c.json({error: 'Invalid token type'}, {status: 401})
        }

        const now = Math.floor(Date.now() / 1000)
        const newToken = await sign(
            {
                sub: payload.sub,
                role: 'admin',
                iat: now,
                exp: now + JWT_TTL_SECONDS,
            },
            JWT_SECRET
        )

        return c.json({token: newToken})
    } catch (e) {
        return c.json({error: 'Invalid or expired refresh token'}, {status: 401})
    }
})

app.post('/auth/logout', (c) => {
    deleteCookie(c, 'refresh_token', {path: '/auth/refresh'})
    return c.json({ok: true})
})

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
        return c.json({error: 'Internal Server Error'}, {status: 500});
    }
})

export default app
