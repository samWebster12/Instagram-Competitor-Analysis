async function loginToSocialblade(username, password, page, verbose) {
    if (verbose) console.log("Logging into Socialblade...");

    await page.goto("https://socialblade.com/login", {
        waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(1000);

    console.log("Logging into Social Blade account " + username + "...\n");
    await page.waitForSelector('input[name="dashboard_email"]');
    await page.type('input[name="dashboard_email"]', username);
    await page.waitForTimeout(1000);

    await page.type('input[name="dashboard_password"]', password);
    await page.waitForTimeout(2000);

    await page.click('input[type="submit"]');

    if (verbose) console.log("Logged into Socialblade account " + username);
    let headers = (await page.goto("https://socialblade.com/"))
        .request()
        .headers();
    let cookies = await page.cookies();

    return { headers, cookies };
}

export default loginToSocialblade;
