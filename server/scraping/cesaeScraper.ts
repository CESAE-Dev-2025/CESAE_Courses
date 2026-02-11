import { chromium, type Page } from "playwright";
import type { Course } from "../../shared/src/types";

export async function scrapeCesaeCourses(): Promise<Course[]> {
    const browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();

    try {
        await page.goto("https://cesaedigital.pt/fldrSite/pages/coursesList.aspx", { waitUntil: "domcontentloaded" });

        await page.waitForSelector("article");

        let previousCount = 0;

        while (true) {
            const currentCount = await page.locator("article").count();
            console.log("Cursos carregados:", currentCount);

            if (currentCount === previousCount) break;
            previousCount = currentCount;

            const showMoreBtn = page.locator("#mainSection_btnShowMore");

            if ((await showMoreBtn.count()) === 0 || !(await showMoreBtn.isVisible()))
            {
                break;
            }

            await showMoreBtn.click();

            // espera novos elementos aparecerem
            await page.waitForTimeout(1500);
        }

        // recolher URLs únicas
        const courseUrls: string[] = await page.$$eval(
            "article a",
            (links) =>
                [
                    ...new Set(links.map(a => (a as HTMLAnchorElement).href))
                ]);

        const results: Course[] = [];
        let nextId = 1;

        for (const url of courseUrls) {


            await page.goto(url, { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(800);

            const data: Course = await page.evaluate(() => ({
                id: 0,
                name: document.querySelector("h1")?.textContent?.trim() ?? "",
                coverUrl: document.querySelector<HTMLImageElement>("#mainSection_imgCourse")?.src ?? "",
                startDate: document.querySelector("#mainSection_lblDtInicio")?.textContent?.trim() ?? "",
                endDate: document.querySelector("#mainSection_lblDtFim")?.textContent?.trim() ?? "",
                time: document.querySelector("#mainSection_lblHorario")?.textContent?.trim() ?? "",
                timeDescription: document.querySelector(".breadcrumb")?.textContent?.trim() ?? "",
                duration: document.querySelector("#mainSection_lblDuracao")?.textContent?.trim() ?? "",
                regime: document.querySelector("div.bg-secondary span.bold")?.textContent?.trim() ?? "",
                location: document.querySelector("aside.signup ul li:first-child")?.textContent?.trim() ?? "",
                description: document.querySelector("#mainSection_lblLongDesc")?.textContent?.trim() ?? "",
                audience: document.querySelector("#mainSection_destinatarios")?.textContent?.trim() ?? "",
                requirements: document.querySelector("#mainSection_requisitos")?.textContent?.trim() ?? "",
                project: document.querySelector("#mainSection_desigProjeto")?.textContent?.trim() ?? "",
                price: document.querySelector("#mainSection_lblPrice")?.textContent?.trim() ?? "",
                benefits: document.querySelector<HTMLAnchorElement>("#mainSection_divBeneficios a")?.href ?? "",
                goals: document.querySelector("#mainSection_objetivos")?.textContent?.trim() ?? "",
                sponsorImgUrl: document.querySelector<HTMLImageElement>("#mainSection_imgLogoParceiros")?.src ?? "",
                courseContent: document.querySelector("h3.title + div.col-12")?.textContent?.trim() ?? "",
                enrollment: document.querySelector<HTMLAnchorElement>("#mainSection_btnInsc")?.href ?? "",
                hasDownloadButton: Boolean(document.querySelector("#mainSection_btnProgm")),
            }));

            data.id = nextId++;
            results.push(data);
        }

        return results;
    } catch (error) {
        console.error("Erro no scraping:", error);
        throw error;
    } finally {
        await browser.close();
    }
}
