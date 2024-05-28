import { chromium } from "playwright-chromium";

export async function scrape(url) {
    const browser = await chromium.launch({
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    });
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => document.querySelector("#now").textContent);
    await page.close();
    await browser.close();
    return result;
}
