// request Axios
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

async function getAccount(username) {
    try {
        const response = await axios.get("https://app.scrapingbee.com/api/v1", {
            params: {
                api_key: process.env.SCRAPING_BEE_API_KEY,
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
