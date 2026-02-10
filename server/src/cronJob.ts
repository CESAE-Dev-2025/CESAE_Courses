import cron from 'node-cron';
import {runScrapeAndSave} from "./scraper";

// Executa todos os dias às 03:00
async function startScraper() {
    await runScrapeAndSave();
}

async function scheduleScraper() {
    cron.schedule('0 0 3 * * *', async () => {
        console.log('⏰ Iniciando scrape programado...');
        await runScrapeAndSave();
    });
}

export {scheduleScraper, startScraper};