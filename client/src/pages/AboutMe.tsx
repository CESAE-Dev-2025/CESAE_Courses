import HeroBanner from "../components/HeroBanner/HeroBanner";
import AboutMission from "../components/AboutMission/AboutMission.tsx";
import AboutHistory from "../components/AboutHistory/AboutHistory.tsx";
import AboutObjectives from "../components/AboutObjectives/AboutObjectives";
import heroBg from "@/assets/heroBannerAbout.jpg";
import AboutImpact from "../components/AboutImpact/AboutImpact.tsx";

function About() {
    return (
        <div>
            <AboutHistory/>
            <AboutMission/>
            <AboutObjectives/>
            <AboutImpact/>
        </div>
    );
}

export default About;

