import { getAccount, getPosts } from "../instagram-api/instagram-api.js";

async function testGetPosts() {
    return await getPosts(
        "61223993155",
        "30",
        "QVFEV2w3TFNFbGp2T0RNZmotSHhkWEFzWHRPS2FaeGtGM0FkTjlmS1VoMFlTaFNVOEhxVXNna0FBdk9jMTZBWjc5WGExcThZdUdZVDhQX09lNE9seWRodA",
    );
}

(async () => {
    console.log(await testGetPosts());
})();
