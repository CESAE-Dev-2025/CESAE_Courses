const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated() {
    return Boolean(getToken())
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export async function login(username: string, password: string) {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    if (!response.ok)
        throw new Error('Failed to login');

    const data = await response.json()
    if (!data?.token)
        throw new Error('Missing token');

    saveToken(data.token)
    return data.token as string
}

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

export async function refreshToken() {
    const response = await fetch(`${SERVER_URL}/auth/refresh`, {
        method: 'POST',
    });

    if (!response.ok) {
        clearToken();
        throw new Error('Session expired');
    }

    const data = await response.json();
    if (data.token) {
        saveToken(data.token);
        return data.token as string;
    }
    throw new Error('Failed to refresh token');
}

export async function logout() {
    clearToken()
    await fetch(`${SERVER_URL}/auth/logout`, { method: 'POST' })
}

export function withAuth(headers: HeadersInit = {}) {
    const token = getToken()
    if (!token) return headers
    return { ...headers, Authorization: `Bearer ${token}` }
}
