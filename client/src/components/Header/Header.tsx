import { useState } from "react";
import styles from "./Header.module.css";
import logo from "/src/assets/cesae-digital-logo.svg";
import menuIcon from "@/assets/menu-hamburger.svg?url";
import { Link } from "react-router-dom";


function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <img
                    src={logo}
                    alt="logo CESAE Digital"
                    className={styles.logo}
                />
            </div>

            {/* Menu desktop */}
            <nav className={styles.nav}>
                <Link to="/home">Cursos</Link>
                <Link to="/about">Sobre</Link>
                <Link to="/contact">Contatos</Link>
            </nav>

            {/* Menu mobile */}
            <div className={styles.menuContainer}>
                <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
                    {open ? (
                        <span className={styles.closeIcon}>&#10005;</span>
                    ) : (
                        <img src={menuIcon} alt="Menu" />
                    )}
                </button>
                {open && (
                    <nav className={styles.dropdownMenu}>
                        <Link to="/home">Cursos</Link>
                        <Link to="/about">Sobre</Link>
                        <Link to="/contact">Contatos</Link>
                    </nav>
                )}
            </div>
                   
        </header>
        
        
    )
}
export default Header