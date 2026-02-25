import { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import CourseCard from "../CourseCard/CourseCard";
import { Course } from "shared";
import styles from "./CourseList.module.css";

interface Props {
  courses: Course[];
}

export default function CourseList({ courses }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegime, setSelectedRegime] = useState('');
  const [open, setOpen] = useState(false);

  const regimes = Array.from(
      new Set(courses.map(c => c.regime).filter(Boolean))
  );

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRegime =
        !selectedRegime || course.regime === selectedRegime;

    return matchesSearch && matchesRegime;
  });

  return (
      <section className={styles.section}>
        <MDBContainer className="py-4 py-md-5">

          {/* FILTER BAR */}
          <div className={styles.filterBar}>
            <div className={styles.searchContainer}>
              <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
              />
              <i className="fas fa-search"></i>
            </div>
            <div className={styles.customSelect}>
              <button
                  className={`${styles.selectTrigger} ${open ? styles.open : ''}`}
                  onClick={() => setOpen(prev => !prev)}
              >
                {selectedRegime || "Regimes"}
                <span className={styles.arrow} />
              </button>

              {open && (
                  <div className={styles.selectDropdown}>
                    <div
                        className={styles.option}
                        onClick={() => {
                          setSelectedRegime('');
                          setOpen(false);
                        }}
                    >
                      Todos
                    </div>

                    {regimes.map(regime => (
                        <div
                            key={regime}
                            className={styles.option}
                            onClick={() => {
                              setSelectedRegime(regime);
                              setOpen(false);
                            }}
                        >
                          {regime}
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>

          {/* RESULTADOS */}
          {filteredCourses.length === 0 ? (
              <div className={styles.emptyState}>
                <i className="fas fa-inbox mb-3"></i>
                <p className="fw-bold">Nenhum curso encontrado</p>
                {searchTerm && (
                    <small className="text-muted">
                      Tente um termo de busca diferente
                    </small>
                )}
              </div>
          ) : (
              <>
                <p className={styles.resultCount}>
                  {filteredCourses.length} curso
                  {filteredCourses.length !== 1 ? 's' : ''} encontrado
                  {filteredCourses.length !== 1 ? 's' : ''}
                </p>

                <MDBRow className="g-3 g-lg-4">
                  {filteredCourses.map(course => (
                      <MDBCol
                          key={course.id}
                          xs="12"
                          sm="6"
                          md="4"
                          lg="3"
                      >
                        <CourseCard course={course} />
                      </MDBCol>
                  ))}
                </MDBRow>
              </>
          )}

        </MDBContainer>
      </section>
  );
}