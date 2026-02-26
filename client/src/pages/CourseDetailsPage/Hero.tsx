import { MDBBadge } from "mdb-react-ui-kit";
import { Course } from "shared";
import styles from "./CourseDetailsPage.module.css";

interface Props {
    course: Course;
}

function hasText(value?: string | null) {
    return Boolean(value?.trim());
}

export default function Hero({ course }: Props) {
    return (
        <section className={styles.hero}>
            <img
                src={course.coverUrl || "https://via.placeholder.com/800x400"}
                alt={course.name}
                className={styles.heroImage}
            />

            <div className="container">
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{course.name}</h1>

                    {hasText(course.regime) && (
                        <MDBBadge pill className={styles.heroBadge}>
                            {course.regime}
                        </MDBBadge>
                    )}
                </div>
            </div>
        </section>
    );
}