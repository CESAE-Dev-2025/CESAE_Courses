import styles from "./AboutObjectives.module.css";

const objectives = [
    {
        id: "1",
        text: "Responder às necessidades de formação designadamente nas áreas da economia digital e (re)qualificação profissional de ativos empregados e desempregados.",
    },
    {
        id: "2",
        text: "Potenciar o desenvolvimento das competências digitais, enquanto instrumento de promoção da empregabilidade dos ativos.",
    },
    {
        id: "3",
        text: "Promover a conceção e participação em percursos formativos qualificantes de jovens desempregados, com o objetivo de melhorar a sua empregabilidade.",
    },
];

const AboutObjectives = () => {
    return (
        <section className={styles.objectivesSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>Objetivos</h2>

                <div className={styles.cards}>
                    {objectives.map((objective) => (
                        <div key={objective.id} className={styles.card}>
                            <span className={styles.backgroundNumber}>{objective.id}</span>
                            <p className={styles.text}>{objective.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutObjectives;
