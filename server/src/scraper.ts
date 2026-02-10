import 'dotenv/config';
import {chromium} from 'playwright';

export type CourseData = {
    name: string | undefined;
    cover_url: string | null;
    start_date: string | undefined;
    end_date: string | undefined;
    time: string | undefined;
    time_description: string | undefined;
    duration: string | undefined;
    regime: string | undefined;
    location: string | undefined;
    price: string | undefined;
    sponsor_img_url: string | null;
    has_download_button: number;
    url: string;
};

/**
 * Executa o scraping dos cursos e (opcionalmente) salva no banco.
 * Por agora, apenas faz o scrape e imprime os resultados; ajuste a parte de persistência conforme necessário.
 */
export async function runScrapeAndSave(): Promise<void> {
    const browser = await chromium.launch({headless: true});
    const page = await browser.newPage();

    try {
        await page.goto(process.env.SCRAPPING_BASE_URL!, {waitUntil: 'networkidle'});

        console.log("Page loaded.")

        await page.waitForSelector('article');

        let previousCount = 0;

        // Carrega todos os cards clicando em "Mostrar mais" até não haver mais crescimento
        while (true) {
            const currentCount = await page.locator('article').count();
            console.log('Cursos carregados:', currentCount);

            if (currentCount === previousCount) break;
            previousCount = currentCount;

            const showMoreBtn = page.locator('#mainSection_btnShowMore');

            // se não existe ou não está visível, acabou.
            if ((await showMoreBtn.count()) === 0 || !(await showMoreBtn.isVisible())) {
                break;
            }

            await Promise.all([
                page.waitForLoadState('networkidle'),
                showMoreBtn.click(),
            ]);

            await page.waitForTimeout(800);
        }

        // Todas as URLs únicas de cursos disponíveis na página
        const courseUrls: string[] = await page.$$eval('article a', (links) =>
            [...new Set(links.map((a) => (a as HTMLAnchorElement).href))]
        );

        console.log('Total de URLs de cursos encontradas:', courseUrls.length);

        for (const url of courseUrls) {
            await page.goto(url, {waitUntil: 'networkidle'});

            const data: Omit<CourseData, 'url'> = await page.evaluate(() => ({
                name: document.querySelector('h1')?.textContent ?? undefined,
                cover_url: (document.querySelector('#mainSection_imgCourse') as HTMLImageElement | null)?.src ?? null,

                start_date: document.querySelector('#mainSection_lblDtInicio')?.textContent ?? undefined,
                end_date: document.querySelector('#mainSection_lblDtFim')?.textContent ?? undefined,
                time: document.querySelector('#mainSection_lblHorario')?.textContent ?? undefined,
                time_description: document.querySelector('.breadcrumb')?.textContent ?? undefined,

                duration: document.querySelector('#mainSection_lblDuracao')?.textContent ?? undefined,
                regime: document.querySelector('.breadcrumb')?.textContent ?? undefined,
                location: document.querySelector('aside.signup ul li:first-child')?.textContent ?? undefined,

                price: document.querySelector('#mainSection_lblPrice')?.textContent ?? undefined,

                sponsor_img_url: (document.querySelector('#mainSection_imgLogoParceiros') as HTMLImageElement | null)?.src ?? null,
                has_download_button: 0,
            }));

            const course: CourseData = {url, ...data};

            // Aqui você pode substituir por lógica de persistência no DB (Drizzle)
            // Ex.: await db.insert(courses).values(mapCourseToSchema(course))
            console.log('COURSE', course);
        }
    } finally {
        await browser.close();
    }
}
