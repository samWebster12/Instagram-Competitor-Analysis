// request Axios
import axios from "axios";
import { number } from "mathjs";

//https://www.instagram.com/graphql/query/?query_hash=56a7068fea504063273cc2120ffd54f3&variables=%7B%22id%22%3A%2261223993155%22%2C%22first%22%3A30%2C%22after%22%3A%22QVFEV2w3TFNFbGp2T0RNZmotSHhkWEFzWHRPS2FaeGtGM0FkTjlmS1VoMFlTaFNVOEhxVXNna0FBdk9jMTZBWjc5WGExcThZdUdZVDhQX09lNE9seWRodA%3D%3D%22%7D
async function getPosts(accountId, numberPosts, endCursor) {
    try {
        const url = `https://www.instagram.com/graphql/query/?query_hash=56a7068fea504063273cc2120ffd54f3&variables=%7B%22id%22%3A%22${accountId}%22%2C%22first%22%3A${numberPosts}%2C%22after%22%3A%22${endCursor}%3D%3D%22%7D`;
        const response = await axios.get("https://app.scrapingbee.com/api/v1", {
            params: {
                api_key:
                    "ZKGWVYELWELS7EHH7H1NCADI2PPT1VSZ5CHBH4WU0R73F5KAHS4ZIBFMIC5N7RZG2E99MC2QZZUENNDA",
                url,
                render_js: "false",
            },
        });

        if (response.status != 200) {
            return {};
        } else {
            return response.data;
        }
    } catch (e) {
        console.log(e);
        return {};
    }
}

export default getPosts;
