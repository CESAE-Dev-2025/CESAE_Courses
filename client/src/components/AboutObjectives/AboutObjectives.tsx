import styles from "./AboutObjectives.module.css";

const AboutObjectives = () => {
    return (
        <section className={styles.objectivesSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>Objetivos</h2>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <span className={styles.number}>01</span>
                        <p className={styles.text}>
                            Responder às necessidades de formação designadamente nas áreas
                            da economia digital e (re)qualificação profissional de ativos
                            empregados e desempregados.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <span className={styles.number}>02</span>
                        <p className={styles.text}>
                            Potenciar o desenvolvimento das competências digitais,
                            enquanto instrumento de promoção da empregabilidade dos ativos.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <span className={styles.number}>03</span>
                        <p className={styles.text}>
                            Promover a conceção e participação em percursos formativos
                            qualificantes de jovens desempregados, com o objetivo de
                            melhorar a sua empregabilidade.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutObjectives;
