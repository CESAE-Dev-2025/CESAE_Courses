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
        customLogger("INFO", "⏰ Iniciando scrape programado...");

        const data = await scrapeCesaeCourses();

        customLogger("INFO", `Scrape concluído com sucesso. ${data.length} cursos encontrados.`);

        if (data.length === 0)
            return;

        // console.log(data[0]);
        await db.delete(courses);
        await db.insert(courses).values(data);
    });
}

// TODO: Considerar area administrativa para status, triggers e alterações
// job.nextRun( /*optional*/ startFromDate);                              // Get a Date object representing the next run
// job.nextRuns(10, /*optional*/ startFromDate);                    // Get an array of Dates, containing the next n runs
// job.previousRuns(10, /*optional*/ referenceDate);      // Get an array of Dates, containing previous n scheduled runs
// job.msToNext( /*optional*/ startFromDate);                      // Get the milliseconds left until the next execution
// job.currentRun();                             // Get a Date object showing when the current (or last) run was started
// job.previousRun();                                     // Get a Date object showing when the previous job was started
//
// job.match(date);                    // Check if a Date object or date string matches the cron pattern (true or false)
//
// job.isRunning();                        // Indicates if the job is scheduled and not paused or killed (true or false)
// job.isStopped();                        // Indicates if the job is permanently stopped using `stop()` (true or false)
// job.isBusy();                                    // Indicates if the job is currently busy doing work (true or false)
//
// job.getPattern();                       // Returns the original cron pattern string, or undefined for date-based jobs
// job.getOnce();                                                   // Returns the original run-once date (Date or null)

export {job, scheduleScraper};