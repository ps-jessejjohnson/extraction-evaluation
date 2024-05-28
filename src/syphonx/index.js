import { chromium } from "playwright-chromium";
import * as syphonx from "./script.js"

const template = { actions: [{ select: [{ name: "now", query: [["#now"]] }] }] };

export async function scrape(url) {
    const browser = await chromium.launch({
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    });
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(`${syphonx.script}(${JSON.stringify({ ...template, url })})`);
    await page.close();
    await browser.close();
    return result?.data?.now?.value;
}
