import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import loginToSocialblade from "./login-socialblade.js";

export const initializeBrowsers = async (
    maxBrowsers,
    maxPagesPerBrowser,
    socialbladeUsername,
    socialbladePassword,
    proxyUsername,
    proxyPassword,
    proxyEndpoint,
) => {
    let browserPool = [];
    const verbose = true;
    let curId = 0;
    for (let i = 0; i < maxBrowsers; i++) {
        const browser = await puppeteer.launch({
            args: [`--proxy-server=${proxyEndpoint}`, "--no-sandbox"],
            headless: false,
        });

        const pages = [];

        //Login for the first page
        const page = await browser.newPage();
        await page.authenticate({
            username: proxyUsername,
            password: proxyPassword,
        }); //Have to do this for proxy
        await loginToSocialblade(
            socialbladeUsername,
            socialbladePassword,
            page,
            verbose,
        );
        pages.push({ page, inUse: false, id: curId });
        curId++;

        //generate the rest of the pages for a given browser
        for (let j = 0; j < maxPagesPerBrowser - 1; j++) {
            const page = await browser.newPage();
            await page.authenticate({
                username: proxyUsername,
                password: proxyPassword,
            }); //Have to do this for proxy
            pages.push({ page, inUse: false, id: curId });
            curId++;
        }

        browserPool.push({ browser, pages });
    }

    return browserPool;
};

export default initializeBrowsers;
