import {useEffect, useState} from "react";
import Header from "../components/Header/Header.tsx";
import HeroBanner from "../components/HeroBanner/HeroBanner.tsx";
import heroBg from "../assets/bg-cesae-hero.jpg";
import CourseList from "../components/CourseList/CourseList.tsx";
import Footer from "../components/Footer/Footer.tsx";
import {Course} from "shared";

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
        getCourses();
    }, []);

    return (
        <>
            <Header/>
            <HeroBanner title="Nossos Cursos" backgroundImage={heroBg}/>
            <CourseList courses={coursesData ?? []}/>
            <Footer/>
        </>
    )
}

export default Home
