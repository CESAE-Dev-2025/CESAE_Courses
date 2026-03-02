import {MDBBtn} from "mdb-react-ui-kit";
import {Course} from "shared";
import styles from "./CourseDetailsPage.module.css";

interface Props {
    course: Course;
}

function hasText(value?: string | null) {
    return Boolean(value?.trim());
}

export default function CourseCTA({course}: Props) {
    const hasEnrollmentUrl =
        hasText(course.enrollment) &&
        (course.enrollment.startsWith("http://") ||
            course.enrollment.startsWith("https://"));

    const shouldShowDownloadButton = Boolean(course.hasDownloadButton);

    function downloadDoc(idDoc?: string | number) {
        if (!idDoc) return;

        const form = document.getElementById("frmDown") as HTMLFormElement | null;
        if (!form) return;

        const idDocInput = form.querySelector<HTMLInputElement>('input[name="idDoc"]');
        if (!idDocInput) return;

        idDocInput.value = String(idDoc);
        form.submit();
    }

    if (!hasEnrollmentUrl && !shouldShowDownloadButton) return null;

    return (
        <div className={styles.mobileCta}>
            <div className="d-grid container">
            <form
                name="frmDown"
                id="frmDown"
                method="post"
                action="https://cesaedigital.pt/ifldr/guestDownloader.aspx"
                target="_blank"
            >
                <input type="hidden" id="idDoc" name="idDoc"/>
                <input type="hidden" id="DownMode" name="DownMode" value="TIMED"/>
            </form>
            {hasEnrollmentUrl && (

                <MDBBtn
                    tag="a"
                    href={course.enrollment}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-brand-primary w-sm-100 mb-2"
                >
                    Quero-me inscrever
                </MDBBtn>
            )}

            {shouldShowDownloadButton && (
                <MDBBtn
                    type="button"
                    className="btn-brand-secondary w-100"
                    onClick={() => downloadDoc(course.downloadId)}
                >
                    Descarregar Programa
                </MDBBtn>

            )}
            </div>
        </div>
    );
}