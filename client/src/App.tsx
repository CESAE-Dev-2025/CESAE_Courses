import {useState} from 'react'
import beaver from './assets/beaver.svg'
import './App.css'
import {Course} from "shared/dist/types/course";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {
    const [coursesData, setCoursesData] = useState<Course[] | undefined>()
    // const [courseData, setCourseData] = useState<Course | undefined>()

    async function getCourses() {
        try {
            const req = await fetch(`${SERVER_URL}/courses`)
            const res: Course[] = await req.json()
            setCoursesData(res)
        } catch (error) {
            console.log(error)
        }
    }

    /* Função para buscar 1 curso (por id)
    async function getCourse(courseId: number) {

        try {
            const req = await fetch(`${SERVER_URL}/courses/${courseId}`)
            const res: Course = await req.json()
            setCourseData(res)
        } catch (error) {
            console.log(error)
        }
    }
    */

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
                    {/*<button onClick={() => getCourse(1)}>*/}
                    {/*    Call API (curso 1)*/}
                    {/*</button>*/}
                    <button onClick={getCourses}>
                        Call API (cursos)
                    </button>
                    <a className='docs-link' target='_blank' href="https://bhvr.dev">Docs</a>
                </div>
                {/*{courseData && (*/}
                {/*    <pre className='response'>*/}
                {/*        <code>*/}
                {/*            Curso: {courseData.name} <br/>*/}
                {/*            Início: {courseData.startDate} <br/>*/}
                {/*            Horário: {courseData.time} / {courseData.timeDescription}<br/>*/}
                {/*            Duração: {courseData.duration}*/}
                {/*        </code>*/}
                {/*  </pre>*/}
                {/*)}*/}
                {coursesData && (
                    <pre className='response'>
                        <code>
                            Número de cursos: {coursesData.length}
                        </code>
                  </pre>
                )}
            </div>
        </>
    )
}

export default App
