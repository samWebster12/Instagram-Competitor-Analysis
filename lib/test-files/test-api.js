import { getAccount, getPosts } from "../instagram-api/instagram-api.js";

async function testGetPosts() {
    console.log(await getAccount("businessimperials"));
}

(async () => {
    console.log(await testGetPosts());
})();
