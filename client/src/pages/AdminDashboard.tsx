import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {clearToken, logout, withAuth, refreshToken} from '../api/auth'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

function AdminDashboard() {
    const navigate = useNavigate()
    const [message, setMessage] = useState<string | null>(null)

    async function apiFetch(url: string, options: RequestInit = {}) {
        let res = await fetch(url, {
            ...options,
            headers: withAuth(options.headers || {})
        })

        if (res.status === 401) {
            try {
                // Tenta renovar o token
                await refreshToken()
                // Tenta novamente a requisição original com o novo token
                res = await fetch(url, {
                    ...options,
                    headers: withAuth(options.headers || {})
                })
            } catch (e) {
                // Se falhar o refresh, limpa e vai pro login
                clearToken()
                navigate('/login')
                throw e
            }
        }
        return res
    }

    async function runScrape() {
        setMessage(null)
        try {
            const res = await apiFetch(`${SERVER_URL}/admin/run-scrape`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            setMessage(JSON.stringify(data))
        } catch (error) {
            setMessage((error as Error).message)
        }
    }

    async function getJobInfo() {
        setMessage(null)
        try {
            const res = await apiFetch(`${SERVER_URL}/admin/scrape-job-info`, {
                method: 'GET',
            })
            const data = await res.json()
            setMessage(JSON.stringify(data))
        } catch (error) {
            setMessage((error as Error).message)
        }
    }

    async function doLogout() {
        await logout()
        navigate('/')
    }

    useEffect(() => {
        getJobInfo();
    }, []);

    return (
        <div className="card">
            <h2>Dashboard de administração</h2>
            <div className="button-container">
                <button className="btn btn-primary" onClick={runScrape}>Run Scrape</button>
                <button className="btn btn-outline-primary" onClick={doLogout}>Logout</button>
                <Link className="btn btn-outline-secondary" to="/">Home</Link>
            </div>
            {message && (
                <pre className="">
          <code>{message}</code>
        </pre>
            )}
        </div>
    )
}

export default AdminDashboard
