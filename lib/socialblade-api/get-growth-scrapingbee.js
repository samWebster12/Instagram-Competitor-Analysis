// request Axios
import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { evaluate } from "mathjs";

async function getGrowth(username) {
    try {
        const response = await axios.get("https://app.scrapingbee.com/api/v1", {
            params: {
                api_key:
                    "ZKGWVYELWELS7EHH7H1NCADI2PPT1VSZ5CHBH4WU0R73F5KAHS4ZIBFMIC5N7RZG2E99MC2QZZUENNDA",
                url: `https://socialblade.com/instagram/user/${username}`,
                cookies: "PHPSESSXX=8i23lh0vm3928quajejtuu4al2;",
                premium_proxy: "true",
            },
        });

        const $ = cheerio.load(response.data);
        const growthStr = $("#socialblade-user-content")
            .children()
            .eq(2)
            .children()
            .eq(0)
            .children()
            .eq(0)
            .text()
            .trim()
            .split(" ")[0];

        const growth = growthStringToInt(growthStr);
        return growth;
    } catch (e) {
        return "--";
    }
}

function getGrowthTest(file) {
    const html = fs.readFileSync(`${file}`, { encoding: "utf8", flag: "r" });
    const $ = cheerio.load(html);
    const growthStr = $("#socialblade-user-content")
        .children()
        .eq(2)
        .children()
        .eq(0)
        .children()
        .eq(0)
        .text()
        .trim()
        .split(" ")[0];

    const growth = growthStringToInt(growthStr);
    return growth;
}

async function writeSocialbladeHTML(username) {
    try {
        const response = await axios.get("https://app.scrapingbee.com/api/v1", {
            params: {
                api_key:
                    "ZKGWVYELWELS7EHH7H1NCADI2PPT1VSZ5CHBH4WU0R73F5KAHS4ZIBFMIC5N7RZG2E99MC2QZZUENNDA",
                url: `https://socialblade.com/instagram/user/${username}`,
                cookies: "PHPSESSXX=8i23lh0vm3928quajejtuu4al2;",
                premium_proxy: "true",
            },
        });

        fs.writeFileSync(
            `lib/test-files/socialblade-html-${username}-${Math.floor(
                Math.random() * 100,
            )}.txt`,
            response.data,
        );
    } catch (e) {
        console.log(e);
    }
}

function growthStringToInt(growthStr) {
    if (growthStr.substring(growthStr.length - 1, growthStr.length) == "K") {
        growthStr = growthStr.substring(0, growthStr.length - 1) + " * 1000";
    }

    if (growthStr.substring(growthStr.length - 1, growthStr.length) == "M") {
        growthStr = growthStr.substring(0, growthStr.length - 1) + " * 1000000";
    }

    if (growthStr == "--") growthStr = "0";

    const growth = evaluate(growthStr);
    return growth;
}

export default getGrowth;
