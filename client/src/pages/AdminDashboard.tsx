import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {clearToken, logout, withAuth, refreshToken} from '../api/auth'
import {JobInfo} from "shared";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import JobInfoCard from "../components/JobInfoCard/JobInfoCard.tsx";


const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

function AdminDashboard() {
    const navigate = useNavigate()
    const [message, setMessage] = useState<string | null>(null)
    const [jobData, setJobData] = useState<JobInfo | null>(null)

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
            console.log(message)
        } catch (error) {
            setMessage((error as Error).message)
        }
    }

    async function getJobInfo() {
        setJobData(null)
        try {
            const res = await apiFetch(`${SERVER_URL}/admin/scrape-job-info`, {
                method: 'GET',
            })
            const resJson = await res.json()
            const payload = resJson.data as {
                lastRun: string | null
                nextRun: string | null
                isRunning: boolean
                isStopped: boolean
                isBusy: boolean
            }

            // Converte strings ISO em objetos Date (ou null)
            const normalized: JobInfo = {
                lastRun: payload?.lastRun ? new Date(payload.lastRun) : null,
                nextRun: payload?.nextRun ? new Date(payload.nextRun) : null,
                isRunning: payload?.isRunning ?? false,
                isStopped: payload?.isStopped ?? false,
                isBusy: payload?.isBusy ?? false,
            }

            setJobData(normalized)
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
        <>
            <Header/>
            <h1 className="mt-5">Dashboard de administração</h1>
            <div className="mx-auto col col-md-8 col-lg-6 d-flex flex-column justify-content-around align-items-center my-5">
                <div className="w-100 d-flex gap-3 justify-content-between mb-4">
                    <button className="btn btn-primary" onClick={runScrape}>Run Scrape</button>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary" onClick={() => navigate('/admin/users')}>Gerenciar Usuários</button>
                        <button className="btn btn-outline-secondary" onClick={() => navigate('/admin/change-password')}>Alterar Senha</button>
                    </div>
                    <button className="btn btn-link text-danger" onClick={doLogout}>Logout</button>
                </div>
                <JobInfoCard jobData={jobData!}/>
            </div>
            <Footer/>
        </>
    )
}

export default AdminDashboard
