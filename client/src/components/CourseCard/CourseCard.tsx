import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  // MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBBadge
} from 'mdb-react-ui-kit';
import styles from './CourseCard.module.css';
import {Course} from "shared";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const handleViewDetails = () => {
    window.location.hash = `/curso/${course.id}`;
  };

  return (
    <MDBCard
      className={`${styles.card}`}
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

        <MDBCardTitle className={`${styles.title}`}>
          {course.name}
        </MDBCardTitle>

        <div className={`${styles.infoGrid}`}>
          {course.location && (
            <div className={styles.infoItem}>
              <i></i>
              <small>{course.location}</small>
            </div>
          )}
          {course.duration && (
            <div className={styles.infoItem}>
              <i></i>
              <small>{course.duration}</small>
            </div>
          )}
          {course.startDate && (
            <div className={styles.infoItem}>
              <i></i>
              <small>{course.startDate}</small>
            </div>
          )}
        </div>

        {/*{course.description && (*/}
        {/*  <MDBCardText className={`${styles.description} mb-3 flex-grow-1`}>*/}
        {/*    {course.description.slice(0, 85) + '...'}*/}
        {/*  </MDBCardText>*/}
        {/*)}*/}

        <div className={styles.buttonWrapper}>
          <MDBBtn
              size="sm"
              className={styles.actionBtn}
              onClick={handleViewDetails}
          >
            Saiba Mais
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
