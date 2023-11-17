// request Axios
import axios from "axios";

async function getAccount(username) {
    try {
        const response = await axios.get("https://app.scrapingbee.com/api/v1", {
            params: {
                api_key:
                    "ZKGWVYELWELS7EHH7H1NCADI2PPT1VSZ5CHBH4WU0R73F5KAHS4ZIBFMIC5N7RZG2E99MC2QZZUENNDA",
                url: `https://www.instagram.com/${username}/?__a=1&__d=dis`,
                render_js: "false",
            },
        });

        if (response.status != 200) {
            return {};
        } else {
            return response.data;
        }
    } catch (e) {
        return {};
    }
}

export default getAccount;
