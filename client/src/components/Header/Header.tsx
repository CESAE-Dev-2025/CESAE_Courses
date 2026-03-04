import { useState } from "react";
import styles from "./Header.module.css";
import logo from "/src/assets/cesae-digital-logo.svg";
// import menuIcon from "@/assets/menu-hamburger.svg?url";
import {MDBIcon} from "mdb-react-ui-kit";

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className="container d-flex align-items-center justify-content-between my-3">

                {/* Logo */}
                <a href="/" className={styles.logoLink}>
                    <img
                        src={logo}
                        alt="logo CESAE Digital"
                        className={styles.logo}
                    />
                </a>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <a href="/">Início</a>
                    <a href="/sobre">Sobre</a>
                    <a href="/contacto">Contatos</a>
                </nav>

                {/* Mobile Button */}
                <button
                    className={styles.menuBtn}
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <span className={styles.headerIcon}><MDBIcon fas icon="times" /></span>
                    ) : (
                        <span className={styles.headerIcon}><MDBIcon fas icon="bars" /></span>
                    )}
                </button>

            </div>

            {/* Mobile Dropdown */}
            {open && (
                <nav className={styles.dropdownMenu}>
                    <a href="/">Início</a>
                    <a href="/sobre">Sobre</a>
                    <a href="/contacto">Contatos</a>
                </nav>
            )}
        </header>
    );
}

export default Header;