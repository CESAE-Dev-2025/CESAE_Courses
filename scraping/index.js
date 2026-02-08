const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
        "https://cesaedigital.pt/fldrSite/pages/coursesList.aspx",
        { waitUntil: "networkidle" }
    );

    await page.waitForSelector("article");

    let previousCount = 0;

    while (true) {
        const currentCount = await page.locator("article").count();
        console.log("Cursos carregados:", currentCount);

        // se não cresce, terminou
        if (currentCount === previousCount) {
            break;
        }

        previousCount = currentCount;

        const showMoreBtn = page.locator("#mainSection_btnShowMore");

        // se não existe ou não está visível, acabou.
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

    // Aqui tem todas as URLs do cursos disponiveis na pagina
    const courseUrls = await page.$$eval("article a", links =>
        [...new Set(links.map(a => a.href))]
    );

    console.log(courseUrls);

    await browser.close();
})();
