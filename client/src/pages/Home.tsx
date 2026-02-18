import { useState, useEffect } from 'react'
import { Course } from 'shared/dist/types/course'
import HeroBanner from "../components/HeroBanner/HeroBanner"
import heroBg from "@/assets/bg-cesae-hero.jpg"
import CourseList from "../components/CourseList/CourseList"

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

function Home() {
    const [coursesData, setCoursesData] = useState<Course[]>([])

    async function getCourses() {
        try {
            const req = await fetch(`${SERVER_URL}/courses`)
            const res: Course[] = await req.json()
            setCoursesData(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <>
            <HeroBanner
                title="Nossos Cursos"
                backgroundImage={heroBg}
            />
            <CourseList courses={coursesData} />
        </>
    )
}

export default Home
