import extractGrowth from "./extract-growth.js";
import getFreePage from "./get-free-page.js";

const getGrowthPuppteer = async (
    job,
    browserPool,
    proxyUsername,
    proxyPassword,
    maxBrowsers,
    maxPagesPerBrowser,
) => {
    let pageObj = getFreePage(browserPool);
    let pageId;
    let page;
    // If there is no page available, create a new one with a random browser
    if (!pageObj) {
        pageId = -1;
        page =
            await browserPool[
                Math.floor(Math.random() * maxBrowsers)
            ].newPage();
        await page.authenticate({
            username: proxyUsername,
            password: proxyPassword,
        }); //Have to do this for proxy
    } else {
        pageId = pageObj.id;
        page = pageObj.page;
    }

    let growth;
    try {
        growth = await extractGrowth(job.data.username, page, false);
    } catch (e) {
        console.log(e);
        growth = "--";
    }

    if (pageId != -1) {
        await page.evaluate(() => window.stop());

        const browserIndex = Math.floor(pageId / maxPagesPerBrowser);
        browserPool[browserIndex].pages[
            pageId - browserIndex * maxPagesPerBrowser
        ].inUse = false;
    } else {
        await page.close();
    }

    return growth;
};

export default getGrowthPuppteer;
