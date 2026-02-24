import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBadge,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Course } from 'shared';
import styles from './CourseDetailsPage.module.css';

interface Props {
  course: Course | null;
  isLoading: boolean;
}

function hasText(value: string | undefined | null) {
  return Boolean(value?.trim());
}

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className={styles.detailItem}>
      <i className={`${icon} me-2`}></i>
      <div>
        <strong>{label}:</strong> {value}
      </div>
    </div>
  );
}

function InfoBlock({ title, content, hasLink }: { title: string; content: string; hasLink?: boolean }) {
  return (
    <section className={styles.infoSection}>
      <h3>{title}</h3>
      <p>{content}</p>
    </section>
  );
}

function InfoReferenceBlock({ title, content }: { title: string; content: string }) {
  return (
      <section className={styles.infoSection}>
        <h3>{title}</h3>
        <p>Consulte <a href={content} target="_blank">aqui</a> os beneficios inerentes a este curso.</p>
      </section>
  );
}

// function downloadDoc(IDDoc) {
//   var frm = document.getElementById("frmDown");
//   frm.idDoc.value = IDDoc;
//   frm.submit();
// }

function downloadDoc(idDoc: string | number): void {
  console.log('downloadDoc chamado com:', idDoc);
  if (!idDoc) {
    console.warn('downloadId está vazio');
    return;
  }

  const form = document.getElementById('frmDown') as HTMLFormElement | null;
  if (!form) {
    console.error('Formulário frmDown não encontrado');
    return;
  }

  const idDocInput = form.querySelector<HTMLInputElement>('input[name="idDoc"]');
  if (!idDocInput) {
    console.error('Input idDoc não encontrado no formulário');
    return;
  }

  idDocInput.value = String(idDoc);
  form.submit();
}

export default function CourseDetailsPage({ course, isLoading }: Props) {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <MDBContainer className="py-5">
          <p>Carregando detalhes do curso...</p>
        </MDBContainer>
      </section>
    );
  }

  if (!course) {
    return (
      <section className={styles.section}>
        <MDBContainer className="py-5">
          <MDBCard className={styles.card}>
            <MDBCardBody>
              <h2 className={styles.missingTitle}>Curso não encontrado</h2>
              <p className="mb-0">O curso que você tentou acessar não existe ou não está disponível.</p>
              <MDBBtn className="mt-4 btn-brand-primary" href="#/">
                Voltar para cursos
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </section>
    );
  }

  const hasEnrollmentUrl = course.enrollment.startsWith('http://') || course.enrollment.startsWith('https://');
  const shouldShowDownloadButton = Boolean(course.hasDownloadButton);

  return (
    <section className={styles.section}>
      <MDBContainer className="py-4 py-md-5">
        <MDBBtn className={`btn-brand-secondary ${styles.backBtn}`} href="#/">
          <i className="fas fa-arrow-left me-2"></i>
          Voltar para cursos
        </MDBBtn>

        <MDBCard className={styles.card}>
          <MDBRow className="g-0">
            <MDBCol md="5" lg="4">
              <MDBCardImage
                src={course.coverUrl || 'https://via.placeholder.com/500x500?text=Sem+Imagem'}
                alt={course.name}
                className={styles.image}
              />
            </MDBCol>

            <MDBCol md="7" lg="8">
              <MDBCardBody className={styles.content}>
                {hasText(course.regime) && (
                  <MDBBadge pill className={`${styles.regimeBadge} mb-3`}>
                    {course.regime}
                  </MDBBadge>
                )}

                <h1 className={styles.title}>{course.name}</h1>

                <div className={styles.detailList}>
                  {hasText(course.location) && (
                    <DetailItem icon="fas fa-map-marker-alt" label="Local" value={course.location} />
                  )}
                  {hasText(course.duration) && (
                    <DetailItem icon="fas fa-clock" label="Duração" value={course.duration} />
                  )}
                  {hasText(course.startDate) && (
                    <DetailItem icon="fas fa-calendar" label="Início" value={course.startDate} />
                  )}
                  {hasText(course.endDate) && (
                    <DetailItem icon="fas fa-calendar-check" label="Fim" value={course.endDate} />
                  )}
                  {hasText(course.time) && (
                    <DetailItem icon="fas fa-hourglass-half" label="Horário" value={course.time} />
                  )}
                  {hasText(course.timeDescription) && (
                    <DetailItem icon="fas fa-info-circle" label="Turno" value={course.timeDescription} />
                  )}
                </div>

                {hasText(course.price) && (
                  <MDBBadge pill className={styles.priceBadge}>
                    {course.price}
                  </MDBBadge>
                )}

                {(hasEnrollmentUrl || shouldShowDownloadButton) && (
                  <div className={styles.actionButtons}>
                    {hasEnrollmentUrl && (
                      <MDBBtn
                        tag="a"
                        href={course.enrollment}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn-brand-primary ${styles.enrollBtn}`}
                      >
                        Inscrever
                      </MDBBtn>
                    )}
                    {shouldShowDownloadButton && (
                      <MDBBtn
                        tag="button"
                        type="button"
                        className={`btn-brand-secondary ${styles.downloadBtn}`}
                        onClick={() => downloadDoc(course?.downloadId)}
                      >
                        <i className="fas fa-download me-2"></i>
                        Descarregar Programa
                      </MDBBtn>
                    )}
                  </div>
                )}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>

        <div className={styles.infoLayout}>
          {hasText(course.description) && <InfoBlock title="Descrição" content={course.description} />}
          {hasText(course.goals) && <InfoBlock title="Objetivos" content={course.goals} />}
          {hasText(course.audience) && <InfoBlock title="Público-alvo" content={course.audience} />}
          {hasText(course.requirements) && <InfoBlock title="Requisitos" content={course.requirements} />}
          {hasText(course.project) && <InfoBlock title="Projeto Final" content={course.project} />}
          {hasText(course.courseContent) && <InfoBlock title="Conteúdos" content={course.courseContent} />}
          {hasText(course.benefits) && <InfoReferenceBlock title="Benefícios" content={course.benefits} />}
          {/*{hasText(course.enrollment) && <InfoBlock title="Inscrição" content={course.enrollment} />}*/}
        </div>
      </MDBContainer>

      <form name="frmDown" id="frmDown" method="post" action="https://cesaedigital.pt/ifldr/guestDownloader.aspx" target="_blank">
        <input type="hidden" id="idDoc" name="idDoc" />
        <input type="hidden" id="DownMode" name="DownMode" value="TIMED" />
      </form>
    </section>
  );
}
