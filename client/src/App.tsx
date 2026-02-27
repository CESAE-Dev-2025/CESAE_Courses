import type {ReactElement} from 'react'
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import './App.css'
import {isAuthenticated} from './api/auth'
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Home from './pages/Home'
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact.tsx";
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import ChangePassword from './pages/ChangePassword'

function RequireAuth({children}: { children: ReactElement }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace/>
    }
    return children
}

function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}


function App() {
    return (
        <div className="appLayout">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/sobre" element={<AboutMe/>}/>
                        <Route path="/contacto" element={<Contact/>}/>
                        <Route
                            path="/admin"
                            element={
                                <RequireAuth>
                                    <AdminDashboard/>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/admin/users"
                            element={
                                <RequireAuth>
                                    <AdminUsers/>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/admin/change-password"
                            element={
                                <RequireAuth>
                                    <ChangePassword/>
                                </RequireAuth>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
