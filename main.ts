/// <reference path="./deploy.d.ts" />
import puppeteer, { Page } from "https://deno.land/x/puppeteer@9.0.1/mod.ts";

let lastCheckTs: Date = new Date();
let lastScreenshotPath: string | null = null;

init();

async function takeScreenshot(page: Page) {
  const now = new Date();
  const path = `screenshots/trillbot-${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDay()}.png`;
  lastScreenshotPath = path;
  await page.screenshot({ path });
}

function log(text: string) {
  console.log(`${text} ${new Date().toISOString()}`);
}

// async function checkViewcount(page: Page): Promise<string | null> {
//   log("Checking viewcount");
//   let text = null;
//   try {
//     const selectorViewcount = ".tw-c-text-live";
//     await page.waitForSelector(selectorViewcount);

//     const elementViewcount = await page.$(selectorViewcount);

//     if (elementViewcount) {
//       text = await elementViewcount.evaluate((el) => el.textContent);
//     }

//     return text;
//   } catch (error) {
//     console.error("Error in checkViewcount:", error);
//   }
//   return text;
// }

// async function checkIsLive(page: Page): Promise<boolean> {
//   log("Checking isLive");
//   let isLive = false;
//   try {
//     const selectorIsLive = ".tw-channel-status-text-indicator";
//     await page.waitForSelector(selectorIsLive);

//     const elementIsLive = await page.$(selectorIsLive);

//     if (elementIsLive) {
//       isLive = await elementIsLive.evaluate((el) => el.textContent);
//     }

//     return isLive;
//   } catch (error) {
//     console.error("Error in checkIsLive:", error);
//   }
//   return isLive;
// }

// async function te() {
//   log("exec te");
//   const selector = "a.tw-link";
//   //   const selector = "span .tw-font-size-5";
//   await page.waitForSelector(selector);
//   const anchors = await page.$$(selector);
//   console.log(anchors.length);

//   for (let a of anchors) {
//     const attr = await a.evaluate((el) => {
//       console.log(el);
//       el.getAttribute("data-a-target");
//     });
//     console.log(attr);
//     // if (attr && attr.includes("stream-game-link")) {
//     //   console.log(attr);
//     // }
//   }
// }

async function initPuppeteer(): Promise<Page> {
  console.log("Init bot");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://twitch.tv/montanablack88");
  // await browser.close();

  return page;
}

const page = await initPuppeteer();
await takeScreenshot(page);

function init() {
  log("INIT");
  lastCheckTs = new Date();
  lastScreenshotPath = null;
}

setInterval(() => {
  lastCheckTs = new Date();
}, 1000);

// let isLive: boolean;
// let viewcount: string;
// let game: string;
// await te();

// async function executeChecks() {
//   await te();
//   //   let isLive = await checkIsLive(page);
//   //   let viewcount = await checkViewcount(page);
//   //   console.log(isLive);
//   //   console.log(viewcount);
// }

function handleRequest() {
  log("[REQ]");

  const lastScreenshot = !lastScreenshotPath
    ? ""
    : `<img src="${lastScreenshotPath}"'>`;

  return new Response(
    `<body
      align="center"
      style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
    >
      <h1>TrillBot</h1>
      <p>
        Last check ${lastCheckTs.toISOString()}
      </p>
      ${lastScreenshot}
    </body>`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    }
  );
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest());
});
