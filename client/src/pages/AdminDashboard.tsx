import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearToken, logout, withAuth } from '../api/auth'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

function AdminDashboard() {
  const navigate = useNavigate()
  const [message, setMessage] = useState<string | null>(null)

  async function handleUnauthorized(res: Response) {
    if (res.status === 401) {
      clearToken()
      navigate('/login')
      return true
    }
    return false
  }

  async function runScrape() {
    setMessage(null)
    try {
      const res = await fetch(`${SERVER_URL}/admin/run-scrape`, {
        method: 'POST',
        headers: withAuth({ 'Content-Type': 'application/json' })
      })
      if (await handleUnauthorized(res)) return
      const data = await res.json()
      setMessage(JSON.stringify(data))
    } catch (error) {
      setMessage((error as Error).message)
    }
  }

  async function getJobInfo() {
    setMessage(null)
    try {
      const res = await fetch(`${SERVER_URL}/admin/scrape-job-info`, {
        method: 'GET',
        headers: withAuth()
      })
      if (await handleUnauthorized(res)) return
      const data = await res.json()
      setMessage(JSON.stringify(data))
    } catch (error) {
      setMessage((error as Error).message)
    }
  }

  async function doLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>
      <div className="button-container">
        <button onClick={runScrape}>Run Scrape</button>
        <button onClick={getJobInfo}>Get Job Info</button>
        <button onClick={doLogout}>Logout</button>
        <Link className="docs-link" to="/">
          Home
        </Link>
      </div>
      {message && (
        <pre className="response">
          <code>{message}</code>
        </pre>
      )}
    </div>
  )
}

export default AdminDashboard
