import HeroBanner from "../components/HeroBanner/HeroBanner";
import AboutMission from "../components/AboutMission/AboutMission.tsx";
import AboutHistory from "../components/AboutHistory/AboutHistory.tsx";
import AboutObjectives from "../components/AboutObjectives/AboutObjectives";
import heroBg from "@/assets/heroBannerAbout.jpg";

function About() {
    return (
        <div>
            <HeroBanner title="Sobre Nós" backgroundImage={heroBg}/>
            <AboutHistory/>
            <AboutObjectives/>
            <AboutMission/>
        </div>
    );
}

export default About;

