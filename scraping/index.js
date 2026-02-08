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

    //Aqui tem todas as URLs do cursos disponiveis na pagina
    const courseUrls = await page.$$eval("article a", links =>
        [...new Set(links.map(a => a.href))]
    );

    console.log(courseUrls);

    //Fazer Scraping de todas as paginas de forma automatizada
    for (const url of courseUrls) {
        await page.goto(url, { waitUntil: "networkidle" });

        const data = await page.evaluate(() => ({
           //titulo: document.querySelector("h1, h2, h3")?.innerText,
            //texto: document.body.innerText,
            //imagem: document.querySelector("img")?.src,
            name: document.querySelector("h1")?.innerText,
            cover_url: document.querySelector("#mainSection_imgCourse")?.src ?? null,

            start_date: document.querySelector("#mainSection_lblDtInicio")?.innerText,
            end_date: document.querySelector("#mainSection_lblDtFim")?.innerText,
            time: document.querySelector("#mainSection_lblHorario")?.innerText,
            time_description: document.querySelector(".breadcrumb")?.innerText,

            duration: document.querySelector("#mainSection_lblDuracao")?.innerText,
            regime: document.querySelector(".breadcrumb")?.innerText,
            location: document.querySelector("aside.signup ul li:first-child")?.innerText,

            //description: document.querySelector("#66")?.innerText,
            //audience: document.querySelector("#66")?.innerText,
            //requirements: document.querySelector("#66")?.innerText,

            //project: document.querySelector("#66")?.innerText,
            price: document.querySelector("#mainSection_lblPrice")?.innerText,
            //benefits: document.querySelector("#66")?.innerText,
            //goals: document.querySelector("#66")?.innerText,

            sponsor_img_url: document.querySelector('#mainSection_imgLogoParceiros')?.src ?? null,
            //course_content: document.querySelector("#66")?.innerText,
            //enrollment: document.querySelector("#66")?.innerText,

            has_download_button: 0,
        }));

        console.log(data);
    }
    await browser.close();
    
})();
