import styles from "./HeroBanner.module.css";

type Props = {
  title: string;
  backgroundImage: string;
};

export default function HeroBanner({
  title,
  backgroundImage,
}: Props) {
  return (
    <section
      className={styles.banner}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.overlay} />

      <h1>{title}</h1>
    </section>
  );
}
