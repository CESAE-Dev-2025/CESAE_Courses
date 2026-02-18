import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import CourseList from "@/components/CourseList/CourseList";
import coursesData from "@/courses_v2.json";
import heroBg from "@/assets/bg-cesae-hero.jpg";

function App() {
  return (
    <>
      <Header />
      <HeroBanner title="Nossos Cursos" backgroundImage={heroBg} />
      <CourseList courses={coursesData} />
      <Footer />
    </>
  );
}

export default App;