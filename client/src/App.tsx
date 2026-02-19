import type { ReactElement } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { isAuthenticated } from './api/auth'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import {Course} from "shared";
import Header from "./components/Header/Header.tsx";
import HeroBanner from "./components/HeroBanner/HeroBanner.tsx";
import CourseList from "./components/CourseList/CourseList.tsx";
import Footer from "./components/Footer/Footer.tsx";
import heroBg from "@/assets/bg-cesae-hero.jpg";
import {useState} from "react";

function RequireAuth({ children }: { children: ReactElement }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
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
