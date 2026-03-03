import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container d-flex justify-content-between gap-3 flex-wrap">

                <div className={styles.column}>
                    <h4>CESAE Digital</h4>
                    <p>Centro para o Desenvolvimento de Competências Digitais</p>
                </div>

                <div className={styles.column}>
                    <h4 className="text-sm-end">Contacto</h4>
                    <p className="text-sm-end">Porto, Portugal</p>
                    <p className="text-sm-end">geral@cesaedigital.pt</p>
                </div>

            </div>

            <div className="container">
                <div className={styles.bottom}>
                    © {new Date().getFullYear()} CESAE Digital. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
