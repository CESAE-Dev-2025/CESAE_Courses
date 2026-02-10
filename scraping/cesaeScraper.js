const { chromium } = require("playwright");

async function scrapeCesaeCourses() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(
            "https://cesaedigital.pt/fldrSite/pages/coursesList.aspx",
            { waitUntil: "networkidle" }
        );

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

        const courseUrls = await page.$$eval("article a", links =>
            [...new Set(links.map(a => a.href))]
        );

        console.log("Total de cursos:", courseUrls.length);

        const results = [];

        for (const url of courseUrls) {
            await page.goto(url, { waitUntil: "networkidle" });

            const data = await page.evaluate(() => ({
                name: document.querySelector("h1")?.innerText ?? null,
                cover_url: document.querySelector("#mainSection_imgCourse")?.src ?? null,

                start_date: document.querySelector("#mainSection_lblDtInicio")?.innerText ?? null,
                end_date: document.querySelector("#mainSection_lblDtFim")?.innerText ?? null,
                time: document.querySelector("#mainSection_lblHorario")?.innerText ?? null,
                time_description: document.querySelector(".breadcrumb")?.innerText ?? null,

                duration: document.querySelector("#mainSection_lblDuracao")?.innerText ?? null,
                regime: document.querySelector("div.bg-secondary span.bold")?.innerText ?? null,
                location: document.querySelector("aside.signup ul li:first-child")?.innerText ?? null,

                description: document.querySelector("#mainSection_lblLongDesc")?.innerText ?? null,
                audience: document.querySelector("#mainSection_destinatarios")?.innerText ?? null,
                requirements: document.querySelector("#mainSection_requisitos")?.innerText ?? null,

                project: document.querySelector("#mainSection_desigProjeto")?.innerText ?? null,
                price: document.querySelector("#mainSection_lblPrice")?.innerText ?? null,
                benefits: document.querySelector("#mainSection_divBeneficios a")?.href ?? null,
                goals: document.querySelector("#mainSection_objetivos")?.innerText ?? null,

                sponsor_img_url: document.querySelector("#mainSection_imgLogoParceiros")?.src ?? null,
                course_content: document.querySelector("h3.title + div.col-12")?.innerText ?? null,
                enrollment: document.querySelector("#mainSection_btnInsc")?.href ?? null,

                has_download_button: document.querySelector("#mainSection_btnProgm") ? 1 : 0,
            }));

            results.push(data);
            console.log(data);
        }

        return results;
    } catch (error) {
        console.error("Erro no scraping:", error);
        throw error;
    } finally {
        await browser.close();
    }
}

module.exports = scrapeCesaeCourses;
