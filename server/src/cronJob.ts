import {Cron, type CronOptions} from "croner";
import {customLogger} from "./CustomLogger";
import scrapeCesaeCourses from "../scraping/cesaeScraper";
import {courses} from "./db/schema";
import {drizzle} from "drizzle-orm/mysql2";

const dailyAt3: string = '0 0 3 * * *'                                                 // Executa todos os dias às 03:00
const each5Seconds: string = '*/5 * * * * *'                                         // TESTE: Executa a cada 5 segundos
const eachMinutes: string = '* * * * *'                                                  // TESTE: Executa a cada minuto
const cronOptions: CronOptions = {name: "scraper", timezone: "Europe/Lisbon"}
let job: Cron | undefined;

const db = drizzle(process.env.DATABASE_URL!);

function scheduleScraper() {
    job = new Cron(dailyAt3, cronOptions, async () => {
        customLogger("INFO", "⏰ Starting programmed scrape...");

        const data = await scrapeCesaeCourses();


        if (data.length === 0){
            customLogger("INFO", `Scrape finished. No courses found.`);
            return;
        }

        await db.delete(courses);
        await db.insert(courses).values(data);
        customLogger("INFO", `Scrape finished successfully. ${data.length} courses saved to the database.`);
    });
}

export {job, scheduleScraper};