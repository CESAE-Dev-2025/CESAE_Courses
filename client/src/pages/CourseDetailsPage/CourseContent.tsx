import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { Course } from "shared";
import styles from "./CourseDetailsPage.module.css";

interface Props {
    course: Course;
}

function hasText(value?: string | null) {
    return Boolean(value?.trim());
}

interface SectionProps {
    id: number;
    title: string;
    content: string;
}

function AccordionSection({ id, title, content }: SectionProps) {
    return (
        <MDBAccordionItem collapseId={id} headerTitle={title}>
            <div className={styles.sectionContent}>
                {content}
            </div>
        </MDBAccordionItem>
    );
}

const parsedContent = JSON.parse({course.courseContent});

function renderSimpleList(content: string[]) {
    if (!content || !Array.isArray(content)) return null;

    return (
        <div className={styles.moduleBlock}>
            <ul className={styles.moduleList}>
                {content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default function CourseContent({ course }: Props) {
    return (
        <div className={styles.contentWrapper}>
            <MDBAccordion alwaysOpen initialActive={1}>

                {hasText(course.description) && (
                    <AccordionSection
                        id={1}
                        title="Descrição"
                        content={course.description}
                    />
                )}

                {hasText(course.goals) && (
                    <AccordionSection
                        id={2}
                        title="Objetivos"
                        content={course.goals}
                    />
                )}

                {hasText(course.audience) && (
                    <AccordionSection
                        id={3}
                        title="Público-alvo"
                        content={course.audience}
                    />
                )}

                {hasText(course.requirements) && (
                    <AccordionSection
                        id={4}
                        title="Requisitos"
                        content={course.requirements}
                    />
                )}

                {hasText(course.project) && (
                    <AccordionSection
                        id={5}
                        title="Projeto"
                        content={course.project}
                    />
                )}

                {course.courseContent && course.courseContent.trim() !== "[]" && (
                    <MDBAccordionItem collapseId={6} headerTitle="Conteúdos">
                        {renderFormattedString(course.courseContent)}
                    </MDBAccordionItem>
                )}

                {hasText(course.benefits) && (
                    <MDBAccordionItem collapseId={7} headerTitle="Benefícios">
                        <div className={styles.sectionContent}>
                            Consulte{" "}
                            <a
                                href={course.benefits}
                                target="_blank"
                                rel="noreferrer"
                            >
                                aqui
                            </a>{" "}
                            os benefícios inerentes a este curso.
                        </div>
                    </MDBAccordionItem>
                )}

                {hasText(course.sponsorImgUrl) && (
                    <MDBAccordionItem collapseId={8} headerTitle="Curso Financiado">
                        <div className={styles.sectionContent}>
                            <p className={styles.sponsorDescription}>
                                Este curso é financiado por entidades e planos governamentais.
                            </p>

                            <img
                                src={course.sponsorImgUrl}
                                alt="Entidade Financiadora"
                                className={styles.sponsorImage}
                            />
                        </div>
                    </MDBAccordionItem>
                )}

            </MDBAccordion>
        </div>

    );
}