import styles from "./AboutMission.module.css";

const AboutMission: React.FC = () => {
    return (
        <section className={styles.missionSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>A Nossa Missão</h3>
                </div>
                <p className={styles.description}>
                    Promover a combinação de{" "}
                    <strong>experimentação</strong> com{" "}
                    <strong>inovação contínua</strong> como instrumento para o
                    desenvolvimento das{" "}
                    <strong>competências digitais</strong>.
                </p>
            </div>
        </section>
    );
};

export default AboutMission;
