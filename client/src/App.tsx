import {useState} from 'react'
import beaver from './assets/beaver.svg'
import type {ApiResponse} from 'shared'
import './App.css'
import {Course} from "shared/dist/types/course.ts";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {
    const [data, setData] = useState<ApiResponse | undefined>()
    const [courseData, setCourseData] = useState<Course | undefined>()

    async function sendRequest() {
        try {
            const req = await fetch(`${SERVER_URL}/hello`)
            const res: ApiResponse = await req.json()
            setData(res)
        } catch (error) {
            console.log(error)
        }
    }

    async function getCourse(courseId: number) {
        try {
            const req = await fetch(`${SERVER_URL}/courses/${courseId}`)
            const res: Course = await req.json()
            setCourseData(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <a href="https://github.com/stevedylandev/bhvr" target="_blank">
                    <img src={beaver} className="logo" alt="beaver logo"/>
                </a>
            </div>
            <h1>bhvr</h1>
            <h2>Bun + Hono + Vite + React</h2>
            <p>A typesafe fullstack monorepo</p>
            <div className="card">
                <div className='button-container'>
                    <button onClick={sendRequest}>
                        Call API
                    </button>
                    <button onClick={() => getCourse(1)}>
                        Call API (curso 1)
                    </button>
                    <button onClick={() => getCourse(2)}>
                        Call API (curso 2)
                    </button>
                    <a className='docs-link' target='_blank' href="https://bhvr.dev">Docs</a>
                </div>
                {data && (
                    <pre className='response'>
                        <code>
                            Message: {data.message} <br/>
                            Success: {data.success.toString()}
                        </code>
                      </pre>
                )}
                {courseData && (
                    <pre className='response'>
                        <code>
                            Curso: {courseData.name} <br/>
                            Início: {courseData.startDate.toString()} <br/>
                            Horário: {courseData.time} / {courseData.timeDescription}<br/>
                            Duração: {courseData.duration}
                        </code>
                  </pre>
                )}
            </div>
        </>
    )
}

export default App
