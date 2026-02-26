import { Course } from 'shared';
import styles from './CourseDetailsPage.module.css';

import Hero from './Hero';
import QuickInfo from './QuickInfo';
import CourseContent from './CourseContent';
import CourseCTA from './CourseCTA';

interface Props {
  course: Course | null;
  isLoading: boolean;
}

export default function CourseDetailsPage({ course }: Props) {
  if (!course) {
    return (
        <section>
          <h2>Curso não encontrado</h2>
          <p>O curso que tentou aceder não existe.</p>
        </section>
    );
  }

  return (
      <section className={styles.page}>
        <Hero course={course} />
        <QuickInfo course={course} />
        <CourseContent course={course} />
        <CourseCTA course={course} />
      </section>
  );
}