const scrapeCesaeCourses = require("./cesaeScraper");

(async () => {
    const courses = await scrapeCesaeCourses();
})();
