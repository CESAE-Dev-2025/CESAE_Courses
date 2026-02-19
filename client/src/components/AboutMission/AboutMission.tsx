import styles from "./AboutMission.module.css";

const AboutMission = () => {
    return (
        <section className={styles.missionSection}>
            <div className={styles.container}>
                <h3 className={styles.title}>A Nossa Missão</h3>
                <p className={styles.description}>
                    Promover a combinação de experimentação com inovação contínua
                    como instrumento para o desenvolvimento das competências digitais.
                </p>
            </div>
        </section>
    );
};

export default AboutMission;
