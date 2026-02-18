import './App.css'
import {Course} from "shared";
import Header from "./components/Header/Header.tsx";
import HeroBanner from "./components/HeroBanner/HeroBanner.tsx";
import CourseList from "./components/CourseList/CourseList.tsx";
import Footer from "./components/Footer/Footer.tsx";
import heroBg from "@/assets/bg-cesae-hero.jpg";
import {useState} from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {
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

    if (!coursesData)
        getCourses()

    return (
        <>
            <Header />
            <HeroBanner title="Nossos Cursos" backgroundImage={heroBg} />
            <CourseList courses={coursesData ?? []} />
            <Footer />
        </>
    )
}

export default App
