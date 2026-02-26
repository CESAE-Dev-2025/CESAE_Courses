import { Course } from "shared";
import styles from "./CourseDetailsPage.module.css";

interface Props {
    course: Course;
}

function hasText(value?: string | null) {
    return Boolean(value?.trim());
}

interface ItemProps {
    icon: string;
    label: string;
    value: string;
}

function QuickItem({ icon, label, value }: ItemProps) {
    return (
        <div className={styles.quickItem}>
            <i className={`fas ${icon} ${styles.quickIcon}`}></i>

            <div>
                <span className={styles.quickLabel}>{label}</span>
                <span className={styles.quickValue}>{value}</span>
            </div>
        </div>
    );
}

export default function QuickInfo({ course }: Props) {
    return (
        <div className={styles.quickInfo}>
            {hasText(course.startDate) && (
                <QuickItem
                    icon=""
                    label="Início"
                    value={course.startDate}
                />
            )}

            {hasText(course.endDate) && (
                <QuickItem
                    icon=""
                    label="Fim"
                    value={course.endDate}
                />
            )}

            {hasText(course.duration) && (
                <QuickItem
                    icon=""
                    label="Duração"
                    value={course.duration}
                />
            )}

            {hasText(course.time) && (
                <QuickItem
                    icon=""
                    label="Horário"
                    value={course.time}
                />
            )}

            {hasText(course.location) && (
                <QuickItem
                    icon=""
                    label="Local"
                    value={course.location}
                />
            )}

            {hasText(course.price) && (
                <QuickItem
                    icon=""
                    label="Preço"
                    value={course.price}
                />
            )}
        </div>
    );
}