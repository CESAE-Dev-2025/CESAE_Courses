import {Cron, type CronOptions} from "croner";
import {customLogger} from "./CustomLogger";
import {scrapeCesaeCourses} from "./cesaeScraper";
import {courses} from "./db/schema";
import {drizzle} from "drizzle-orm/mysql2";
import type {Course} from "shared/dist/types";

const dailyAt3: string = '0 0 3 * * *'                                                 // Executa todos os dias às 03:00
const each5Seconds: string = '*/5 * * * * *'                                         // TESTE: Executa a cada 5 segundos
const eachMinutes: string = '* * * * *'                                                  // TESTE: Executa a cada minuto
const cronOptions: CronOptions = {name: "scraper", timezone: "Europe/Lisbon"}
let job: Cron | undefined;

const db = drizzle(process.env.DATABASE_URL!);

function scheduleScraper() {
    job = new Cron(dailyAt3, cronOptions, async () => {
        customLogger("INFO", "⏰ Iniciando scrape programado...");

        const data: Course[] = await scrapeCesaeCourses();

        if (data.length === 0){
            customLogger("INFO", `Scrape concluído. Nenhum curso encontrado.`);
            return;
        }

        await db.delete(courses);
        await db.insert(courses).values(data);
        customLogger("INFO", `Scrape concluído com sucesso. ${data.length} cursoss adicionados ao banco de dados.`);
    });
}

export {job, scheduleScraper};