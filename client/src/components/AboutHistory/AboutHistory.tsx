import styles from "./AboutHistory.module.css";

const AboutHistory = () => {
    return (
        <section className={styles.historySection}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Desenvolver competências para a transformação digital
                </h2>

                <div className={styles.twoColumns}>
                    <div className={styles.leftBlock}>
                        <p>
                            O CESAE Digital é um centro de excelência dedicado ao
                            desenvolvimento de competências digitais, essencial para enfrentar
                            os desafios da transformação digital em Portugal.
                        </p>
                    </div>

                    <div className={styles.rightBlock}>
                        <p>
                            O CESAE Digital foi relançado em julho de 2020 para responder aos desafios da transformação digital,
                            promovendo a qualificação de recursos humanos e o reforço da empregabilidade e competitividade económica.
                        </p>
                        <p>
                            Resulta de uma parceria entre o IEFP, IP e a AEP, formalizada pela Portaria n.º 169/2020, com o objetivo
                            de desenvolver competências digitais através da inovação e adaptação contínua às evoluções tecnológicas.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHistory;

