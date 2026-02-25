import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn,
  MDBBadge
} from 'mdb-react-ui-kit';
import styles from './CourseCard.module.css';
import { Course } from "shared";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {

  const handleViewDetails = () => {
    window.location.hash = `/curso/${course.id}`;
  };

  return (
      <MDBCard
          className={styles.card}
          onClick={handleViewDetails}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleViewDetails();
          }}
      >
        <div className={styles.imageContainer}>
          <MDBCardImage
              src={course.coverUrl || 'https://via.placeholder.com/400x250?text=Sem+Imagem'}
              position="top"
              alt={course.name}
              className={styles.image}
          />
        </div>

        <MDBCardBody>
          <div className={styles.badgeRow}>
            {course.regime && (
                <MDBBadge pill className={styles.regimeBadge}>
                  {course.regime}
                </MDBBadge>
            )}
            {course.price && (
                <MDBBadge pill className={styles.priceBadge}>
                  {course.price === "Gratuito" ? course.price : "PAGO"}
                </MDBBadge>
            )}
          </div>

          <MDBCardTitle className={styles.title}>
            {course.name}
          </MDBCardTitle>

          <div className={styles.infoGrid}>
            {course.location && (
                <div className={styles.infoItem}>
                  <small>{course.location}</small>
                </div>
            )}
            {course.duration && (
                <div className={styles.infoItem}>
                  <small>{course.duration}</small>
                </div>
            )}
            {course.startDate && (
                <div className={styles.infoItem}>
                  <small>{course.startDate}</small>
                </div>
            )}
          </div>

          <div className={styles.buttonWrapper}>
            <MDBBtn
                size="sm"
                className={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation(); // evita duplo clique
                  handleViewDetails();
                }}
            >
              Saiba Mais
            </MDBBtn>
          </div>

        </MDBCardBody>
      </MDBCard>
  );
}