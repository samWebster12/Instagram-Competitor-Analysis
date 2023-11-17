import { evaluate } from "mathjs";

async function extractGrowth(account, page, verbose) {
    if (verbose) console.log("Getting socialblade growth for user " + account);
    let followersGained;

    try {
        await page.goto("https://socialblade.com/instagram/user/" + account, {
            waitUntil: "domcontentloaded",
        });
        await page.waitForSelector("#socialblade-user-content", {
            timeout: 60000,
        }); // waits indefinitely for the element to appear

        await page.waitForTimeout(2000);
        followersGained = await page.evaluate(() => {
            //Followers Gained
            const followersGained = document.getElementById(
                "socialblade-user-content",
            ).childNodes[4].childNodes[1].childNodes[1].childNodes[0]
                .textContent;

            // const followers = document.querySelectorAll(".YouTubeUserTopInfo")[1].childNodes[4].textContent;
            //const accountName = document.querySelector('#YouTubeUserTopInfoBlockTop').childNodes[1].childNodes[1].childNodes[0].textContent;

            return followersGained;
        });
    } catch (e) {
        console.log(e);
        console.log("Social Blade timed out: check your connection");
        followersGained = "--";
    }

    if (verbose)
        console.log("Returning socialblade growth for user " + account);

    followersGained = followersGained.trim();
    if (
        followersGained.substring(
            followersGained.length - 1,
            followersGained.length,
        ) == "K"
    ) {
        followersGained =
            followersGained.substring(0, followersGained.length - 1) +
            " * 1000";
    }

    if (
        followersGained.substring(
            followersGained.length - 1,
            followersGained.length,
        ) == "M"
    ) {
        followersGained =
            followersGained.substring(0, followersGained.length - 1) +
            " * 1000000";
    }

    if (followersGained == "--") followersGained = "0";

    const followersGainedNumber = evaluate(followersGained);
    console.log("Followers Gained: ", followersGainedNumber);

    //let followersGainedNumber = 0
    return followersGainedNumber;
}

export default extractGrowth;
