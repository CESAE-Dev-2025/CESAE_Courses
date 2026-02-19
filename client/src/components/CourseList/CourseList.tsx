import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard.tsx';
import {Course} from "shared";
import styles from './CourseList.module.css';

interface Props {
  courses: Course[];
}

export default function CourseList({ courses }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegime, setSelectedRegime] = useState('');

  const regimes = Array.from(new Set(courses.map(c => c.regime).filter(Boolean)));

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegime = !selectedRegime || course.regime === selectedRegime;
    return matchesSearch && matchesRegime;
  });

  return (
    <section className={styles.section}>
      <MDBContainer className="py-4 py-md-5">
        <div className={styles.header}>
          <p className={styles.subtitle}>Encontre o curso perfeito para você</p>
          
          <div className={styles.filterBar}>
            <select
              value={selectedRegime}
              onChange={(e) => setSelectedRegime(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todos os Regimes</option>
              {regimes.map(regime => (
                <option key={regime} value={regime}>
                  {regime}
                </option>
              ))}
            </select>

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
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-inbox mb-3"></i>
            <p className="fw-bold">Nenhum curso encontrado</p>
            {searchTerm && (
              <small className="text-muted">Tente um termo de busca diferente</small>
            )}
          </div>
        ) : (
          <>
            <p className={styles.resultCount}>
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
            </p>
            <MDBRow className="g-4 g-lg-5">
              {filteredCourses.map((course, index) => (
                <MDBCol key={index} xs="12" sm="6" md="4" lg="3">
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