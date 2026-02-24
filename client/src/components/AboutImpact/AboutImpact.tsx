import styles from "./AboutImpact.module.css";

function AboutImpact() {
    return (
        <section className={styles.impactSection}>
            <div className={styles.container}>
                <h3 className={styles.title}>O Nosso Impacto</h3>

                <p className={styles.intro}>
                    Contribuímos ativamente para a transformação digital,
                    capacitando pessoas e organizações com competências
                    essenciais para o futuro.
                </p>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h4>Qualificação e Requalificação</h4>
                        <p>
                            Promovemos formação profissional, reskilling e upskilling
                            para reforçar a empregabilidade e facilitar a integração
                            no mercado de trabalho.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h4>Apoio às Empresas</h4>
                        <p>
                            Desenvolvemos ações de formação, consultoria e cooperação
                            estratégica para fortalecer a competitividade e a inovação
                            das organizações.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AboutImpact