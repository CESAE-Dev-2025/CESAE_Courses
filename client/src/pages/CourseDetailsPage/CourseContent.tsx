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

function renderCourseContent(
    content: { title: string; items: string[] }[]
) {
    if (!content?.length) return null;

    return content
        .filter(section => section.title !== "Conteúdo programático")
        .map((section, i) => (
            <div key={i} className={styles.moduleBlock}>
                {section.title && (
                    <h3 className={styles.moduleTitle}>{section.title}</h3>
                )}

                {section.items.map((item, j) => {
                    const parts = item.split("\n\n");
                    const subTitle = parts[0];
                    const bullets =
                        parts[1]?.split("•").map(b => b.trim()).filter(Boolean) || [];

                    return (
                        <div key={j} className={styles.subModule}>
                            <h4 className={styles.subTitle}>{subTitle}</h4>

                            {bullets.length > 0 && (
                                <ul className={styles.moduleList}>
                                    {bullets.map((b, k) => (
                                        <li key={k}>{b}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        ));
}

export default function CourseContent({ course }: Props) {

    const parsed = JSON.parse(course.courseContent || "[]");

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

                {parsed.length > 0 && (
                    <MDBAccordionItem collapseId={6} headerTitle="Conteúdos">
                        {renderCourseContent(parsed)}
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