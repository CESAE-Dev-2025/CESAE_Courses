import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.column}>
                    <h4>CESAE Digital</h4>
                    <p>Centro para o Desenvolvimento de Competências Digitais</p>
                </div>

                <div className={styles.column}>
                    <h4>Contacto</h4>
                    <p>Porto, Portugal</p>
                    <p>geral@cesaedigital.pt</p>
                </div>

            </div>

            <div className={styles.bottom}>
                © {new Date().getFullYear()} CESAE Digital. Todos os direitos reservados.
            </div>
        </footer>
    );
}
