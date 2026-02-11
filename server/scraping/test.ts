import { scrapeCesaeCourses } from "./cesaeScraper";
import "dotenv/config";

async function main() {
    const courses = await scrapeCesaeCourses();

    console.log("TOTAL DE CURSOS:", courses.length);
    console.log("====================================");

    courses.forEach((course, index) => {
        console.log(`\n📘 CURSO ${index + 1}`);
        console.log("------------------------------------");
        console.log(JSON.stringify(course, null, 2));
    });
}

main();
