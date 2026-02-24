import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact.tsx";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<AboutMe />} />
                <Route path="/contacto" element={<Contact />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
