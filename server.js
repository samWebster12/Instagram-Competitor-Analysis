import express from "express";
import { resolve } from "path";
import { getAccount, getPosts } from "./lib/instagram-api/instagram-api.js";
import {
    initializeBrowsers,
    getGrowthPuppeteer,
} from "./lib/socialblade-api/socialblade-api.js";

import "dotenv/config";

import cors from "cors";

const NUMBER_OF_BROWSERS = 1;
const NUMBER_OF_PAGES_PER_BROWSER = 10;
let browserPool;

const app = express();
const port = 3005;

app.use(
    cors({
        origin: "*",
    }),
);

app.use(express.static(resolve("./dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/instagram/getaccountinfo", async (req, res) => {
    console.log("USERNAME: ", req.query.username);
    res.json({ data: await getAccount(req.query.username) });
});

app.get("/api/instagram/getposts", async (req, res) => {
    //  console.log("ACCOUNT_ID: ", req.query.accountId);
    //  console.log("NUMBER_POSTS: ", req.query.numberPosts);
    //  console.log("END_CURSOR: ", req.query.endCursor);
    res.json({
        data: await getPosts(
            req.query.accountId,
            req.query.numberPosts,
            req.query.endCursor,
        ),
    });
});

app.get("/api/socialblade/getgrowth", async (req, res) => {
    const growth = await getGrowthPuppeteer(
        { data: { username: req.query.username } },
        browserPool,
        process.env.PROXY_USERNAME,
        process.env.PROXY_PASSWORD,
        NUMBER_OF_BROWSERS,
        NUMBER_OF_PAGES_PER_BROWSER,
    );
    console.log(growth);
    res.json({ growth });
});

app.get("/*", (req, res) => {
    //  res.sendFile(resolve("./public/index.html"));
    res.send("<h1>404</h1>").end();
});

async function startServer() {
    /* browserPool = await initializeBrowsers(
        NUMBER_OF_BROWSERS,
        NUMBER_OF_PAGES_PER_BROWSER,
        process.env.SOCIALBLADE_USERNAME,
        process.env.SOCIALBLADE_PASSWORD,
        process.env.PROXY_USERNAME,
        process.env.PROXY_PASSWORD,
        process.env.PUPPETEER_PROXY_ENDPOINT,
    );*/

    app.listen(port, async () => {
        console.log(`Example app listening on port ${port}\n`);
    });
}

startServer();
