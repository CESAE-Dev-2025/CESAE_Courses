import {Course} from "shared";
import HeroBanner from "../components/HeroBanner/HeroBanner.tsx";
import CourseList from "../components/CourseList/CourseList.tsx";
import heroBg from "@/assets/bg-cesae-hero.jpg";
import {useEffect, useState} from "react";
import CourseDetailsPage from "../pages/CourseDetailsPage/CourseDetailsPage.tsx";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function getCourseIdFromHash(hash: string): number | null {
    const cleanedHash = hash.replace("#", "")

    if (!cleanedHash.startsWith("/curso/")) {
        return null
    }

    const id = Number(cleanedHash.split("/")[2])
    return Number.isNaN(id) ? null : id
}

function App() {
    const [coursesData, setCoursesData] = useState<Course[]>([])
    const [error, setError] = useState<string | null>(null)
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(() => getCourseIdFromHash(window.location.hash))

    useEffect(() => {
        const onHashChange = () => {
            setSelectedCourseId(getCourseIdFromHash(window.location.hash))
        }

        window.addEventListener("hashchange", onHashChange)

        return () => {
            window.removeEventListener("hashchange", onHashChange)
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        async function getCourses() {
            try {
                const req = await fetch(`${SERVER_URL}/courses`, {signal: controller.signal})
                if (!req.ok) {
                    throw new Error(`Failed to fetch courses: ${req.status}`)
                }

                const res: Course[] = await req.json()
                setCoursesData(res)
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    return
                }
                console.error(err)
                setError("Não foi possível carregar os cursos. Verifique se o backend está ativo.")
            }
        }

        getCourses()

        return () => {
            controller.abort()
        }
    }, [])

    const selectedCourse = selectedCourseId === null
        ? null
        : coursesData.find((course) => course.id === selectedCourseId) || null
    const isLoadingCourses = !error && coursesData.length === 0

    return (
        <>
            {selectedCourseId === null ? (
                <>
                    <HeroBanner title="Nossos Cursos" backgroundImage={heroBg} />
                    {error && (
                        <p>{error}</p>
                    )}
                    <CourseList courses={coursesData} />
                </>
            ) : (
                <CourseDetailsPage
                    course={selectedCourse}
                    isLoading={isLoadingCourses}
                />
            )}
        </>
    )
}

export default App