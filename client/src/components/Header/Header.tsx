import { useState } from "react";
import styles from "./Header.module.css";
import logo from "/src/assets/cesae-digital-logo.svg";
import menuIcon from "@/assets/menu-hamburger.svg?url";

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <a href="#/" className={styles.logoLink} aria-label="Voltar para a página inicial">
                    <img
                        src={logo}
                        alt="logo CESAE Digital"
                        className={styles.logo}
                    />
                </a>
            </div>

            {/* Menu desktop */}
            <nav className={styles.nav}>
                <a href="#">Cursos</a>
                <a href="#">Sobre</a>
                <a href="#">Contatos</a>
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
                        <a href="#">Cursos</a>
                        <a href="#">Sobre</a>
                        <a href="#">Contatos</a>
                    </nav>
                )}
            </div>
                   
        </header>
        
        
    )
}
export default Header
