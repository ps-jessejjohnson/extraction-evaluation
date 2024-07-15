import { chromium } from "playwright-chromium";

export async function scrape(url) {
    const browser = await chromium.launch({
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    });
    const page = await browser.newPage(); 
    await page.goto(url);
    const startTime = Date.now();
    const result = await page.evaluate(() => document.querySelector("#now").textContent);
    const endTime = Date.now();
    await page.close();
    await browser.close();
    return {
        data: result,
        time: (endTime - startTime) / 1000
    };
}
