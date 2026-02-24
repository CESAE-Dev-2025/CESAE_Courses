import AboutMission from "../components/AboutMission/AboutMission.tsx";
import AboutHistory from "../components/AboutHistory/AboutHistory.tsx";
import AboutObjectives from "../components/AboutObjectives/AboutObjectives";
import AboutImpact from "../components/AboutImpact/AboutImpact.tsx";

function About() {
    return (
        <div className="container">
            <AboutHistory/>
            <AboutMission/>
            <AboutObjectives/>
            <AboutImpact/>
        </div>
    );
}

export default About;

