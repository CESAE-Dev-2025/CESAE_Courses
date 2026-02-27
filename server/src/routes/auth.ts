import {Hono} from 'hono'
import {sign, verify} from 'hono/jwt'
import {jwt} from 'hono/jwt'
import {setCookie, getCookie, deleteCookie} from 'hono/cookie'
import {drizzle} from 'drizzle-orm/mysql2';
import {users} from "../db/schema";
import {eq} from "drizzle-orm";
import bcrypt from 'bcryptjs';

const db = drizzle(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_TTL_SECONDS = Number(process.env.JWT_TTL_SECONDS ?? 600)
const REFRESH_TOKEN_TTL_SECONDS = Number(process.env.REFRESH_TOKEN_TTL_SECONDS ?? 604800)

const auth = new Hono()

auth.get('/me',
    jwt({
        secret: JWT_SECRET,
        alg: 'HS256',
    }),
    (c) => {
        const payload = c.get('jwtPayload');
        return c.json({ok: true, username: payload.sub, role: payload.role})
    }
)

auth.get('/page', (c) => {
    return c.text('Você está autorizado')
})

auth.post('/login', async (c) => {
    const {username, password} = await c.req.json()

    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return c.json({error: 'Credenciais inválidas'}, {status: 401})
    }

    const now = Math.floor(Date.now() / 1000)
    const token = await sign(
        {
            sub: user.username,
            role: user.role,
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
        path: '/auth/refresh',
    })

    return c.json({token})
})

auth.post('/refresh', async (c) => {
    const refreshToken = getCookie(c, 'refresh_token')

    if (!refreshToken) {
        return c.json({error: 'Refresh token ausente'}, {status: 401})
    }

    try {
        const payload = await verify(refreshToken, JWT_SECRET, { alg: 'HS256' })

        if (payload.type !== 'refresh') {
            return c.json({error: 'Tipo de token inválido'}, {status: 401})
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
        return c.json({error: 'Refresh token inválido ou expirado'}, {status: 401})
    }
})

auth.post('/logout', (c) => {
    deleteCookie(c, 'refresh_token', {path: '/auth/refresh'})
    return c.json({ok: true})
})

export default auth;
