import { chromium, type Browser, type Page } from "playwright";

export interface CesaeCourse {
    name: string | null;
    coverUrl: string | null;
    startDate: string | null;
    endDate: string | null;
    time: string | null;
    timeDescription: string | null;
    duration: string | null;
    regime: string | null;
    location: string | null;
    description: string | null;
    audience: string | null;
    requirements: string | null;
    project: string | null;
    price: string | null;
    benefits: string | null;
    goals: string | null;
    sponsorImgUrl: string | null;
    courseContent: string | null;
    enrollment: string | null;
    hasDownloadButton: number;
}

export async function scrapeCesaeCourses(): Promise<CesaeCourse[]> {
    const browser: Browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();

    try {
        await page.goto("https://cesaedigital.pt/fldrSite/pages/coursesList.aspx", { waitUntil: "networkidle" });

        await page.waitForSelector("article");

        let previousCount = 0;

        while (true) {
            const currentCount = await page.locator("article").count();
            console.log("Cursos carregados:", currentCount);

            if (currentCount === previousCount) break;
            previousCount = currentCount;

            const showMoreBtn = page.locator("#mainSection_btnShowMore");

            if (
                (await showMoreBtn.count()) === 0 ||
                !(await showMoreBtn.isVisible())
            ) {
                break;
            }

            await Promise.all([
                page.waitForLoadState("networkidle"),
                showMoreBtn.click(),
            ]);

            await page.waitForTimeout(800);
        }

        const courseUrls: string[] = await page.$$eval(
            "article a",
            (links) => [...new Set(links.map(a => (a as HTMLAnchorElement).href))]
    );

        const results: CesaeCourse[] = [];

        for (const url of courseUrls) {
            await page.goto(url, { waitUntil: "networkidle" });

            const data: CesaeCourse = await page.evaluate(() => ({
                name: document.querySelector("h1")?.textContent ?? null,
                coverUrl: document.querySelector<HTMLImageElement>("#mainSection_imgCourse")?.src ?? null,

                startDate: document.querySelector("#mainSection_lblDtInicio")?.textContent ?? null,
                endDate: document.querySelector("#mainSection_lblDtFim")?.textContent ?? null,
                time: document.querySelector("#mainSection_lblHorario")?.textContent ?? null,
                timeDescription: document.querySelector(".breadcrumb")?.textContent ?? null,

                duration: document.querySelector("#mainSection_lblDuracao")?.textContent ?? null,
                regime: document.querySelector("div.bg-secondary span.bold")?.textContent ?? null,
                location: document.querySelector("aside.signup ul li:first-child")?.textContent ?? null,

                description: document.querySelector("#mainSection_lblLongDesc")?.textContent ?? null,
                audience: document.querySelector("#mainSection_destinatarios")?.textContent ?? null,
                requirements: document.querySelector("#mainSection_requisitos")?.textContent ?? null,

                project: document.querySelector("#mainSection_desigProjeto")?.textContent ?? null,
                price: document.querySelector("#mainSection_lblPrice")?.textContent ?? null,
                benefits: document.querySelector<HTMLAnchorElement>("#mainSection_divBeneficios a")?.href ?? null,
                goals: document.querySelector("#mainSection_objetivos")?.textContent ?? null,

                sponsorImgUrl: document.querySelector<HTMLImageElement>("#mainSection_imgLogoParceiros")?.src ?? null,
                courseContent: document.querySelector("h3.title + div.col-12")?.textContent ?? null,
                enrollment: document.querySelector<HTMLAnchorElement>("#mainSection_btnInsc")?.href ?? null,

                hasDownloadButton: document.querySelector("#mainSection_btnProgm") ? 1 : 0,
            }));

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
