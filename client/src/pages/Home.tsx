import { useState } from 'react'
import { Link } from 'react-router-dom'
import beaver from '../assets/beaver.svg'
import { Course } from 'shared/dist/types/course'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

function Home() {
  const [coursesData, setCoursesData] = useState<Course[] | undefined>()

  async function getCourses() {
    try {
      const req = await fetch(`${SERVER_URL}/courses`)
      const res: Course[] = await req.json()
      setCoursesData(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <a href="https://github.com/stevedylandev/bhvr" target="_blank">
          <img src={beaver} className="logo" alt="beaver logo" />
        </a>
      </div>
      <h1>bhvr</h1>
      <h2>Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="card">
        <div className="button-container">
          <Link className="docs-link" to="/admin/dashboard">
            Admin Dashboard
          </Link>
          <button onClick={getCourses}>Call API (cursos)</button>
          <a className="docs-link" target="_blank" href="https://bhvr.dev">
            Docs
          </a>
        </div>
        {coursesData && (
          <pre className="response">
            <code>Numero de cursos: {coursesData.length}</code>
          </pre>
        )}
      </div>
    </>
  )
}

export default Home
