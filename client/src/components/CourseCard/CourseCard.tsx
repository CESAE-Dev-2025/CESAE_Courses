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
      className={`h-100 ${styles.card}`}
    >
      <div className={styles.imageContainer}>
        <MDBCardImage
          src={course.coverUrl || 'https://via.placeholder.com/400x250?text=Sem+Imagem'}
          position="top"
          alt={course.name}
          className={styles.image}
        />
      </div>

      <MDBCardBody className="p-3 p-md-4 d-flex flex-column flex-grow-1">
        {course.regime && (
          <MDBBadge pill className={`${styles.regimeBadge} mb-2`}>
            {course.regime}
          </MDBBadge>
        )}

        <MDBCardTitle className={`${styles.title} mb-3`}>
          {course.name}
        </MDBCardTitle>

        <div className={`${styles.infoGrid} mb-3`}>
          {course.location && (
            <div className={styles.infoItem}>
              <i className="fas fa-map-marker-alt me-2"></i>
              <small>{course.location}</small>
            </div>
          )}
          {course.duration && (
            <div className={styles.infoItem}>
              <i className="fas fa-clock me-2"></i>
              <small>{course.duration}</small>
            </div>
          )}
          {course.startDate && (
            <div className={styles.infoItem}>
              <i className="fas fa-calendar me-2"></i>
              <small>{course.startDate}</small>
            </div>
          )}
        </div>

        {/*{course.description && (*/}
        {/*  <MDBCardText className={`${styles.description} mb-3 flex-grow-1`}>*/}
        {/*    {course.description.slice(0, 85) + '...'}*/}
        {/*  </MDBCardText>*/}
        {/*)}*/}

        <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
          {course.price && (
            <MDBBadge pill className={styles.priceBadge}>
              {course.price}
            </MDBBadge>
          )}
          <MDBBtn
            size="sm"
            className={`btn-brand-primary ${styles.actionBtn}`}
            onClick={handleViewDetails}
          >
            Saiba Mais
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
