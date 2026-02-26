import { MDBBtn } from "mdb-react-ui-kit";
import { Course } from "shared";
import styles from "./CourseDetailsPage.module.css";

interface Props {
    course: Course;
}

function hasText(value?: string | null) {
    return Boolean(value?.trim());
}

export default function CourseCTA({ course }: Props) {
    const hasEnrollmentUrl =
        hasText(course.enrollment) &&
        (course.enrollment.startsWith("http://") ||
            course.enrollment.startsWith("https://"));

    const shouldShowDownloadButton = Boolean(course.hasDownloadButton);

/*    function downloadDoc(idDoc?: string | number) {
        if (!idDoc) return;

        const form = document.getElementById("frmDown") as HTMLFormElement | null;
        if (!form) return;

        const idDocInput =
            form.querySelector<HTMLInputElement>('input[name="idDoc"]');
        if (!idDocInput) return;

        idDocInput.value = String(idDoc);
        form.submit();
    }*/

    if (!hasEnrollmentUrl && !shouldShowDownloadButton) return null;

    return (
        <div className={styles.mobileCta}>
            {hasEnrollmentUrl && (
                <MDBBtn
                    tag="a"
                    href={course.enrollment}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-brand-primary w-100 mb-2"
                >
                    Quero-me inscrever
                </MDBBtn>
            )}

            {shouldShowDownloadButton && (
                <MDBBtn
                    type="button"
                    className="btn-brand-secondary w-100"
                   // onClick={() => downloadDoc(course.downloadId)}
                >
                    Descarregar Programa
                </MDBBtn>
            )}
        </div>
    );
}