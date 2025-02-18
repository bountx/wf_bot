import dotenv from 'dotenv';
import puppeteer, { Browser, Page } from 'puppeteer';

dotenv.config();
const USOS_LOGIN = process.env.USOS_LOGIN;
const USOS_PASSWORD = process.env.USOS_PASSWORD;
const LOGIN_ZAPISY_WF_URL = process.env.LOGIN_ZAPISY_WF_URL;
const COURSE_ZAPISY_WF_URL = process.env.COURSE_ZAPISY_WF_URL;

async function run(): Promise<void> {
    const browser: Browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    let page: Page | null = null;

    try {
        page = await browser.newPage();

        await page.goto(LOGIN_ZAPISY_WF_URL || '');

        await page.type('#username', USOS_LOGIN || '');
        await page.type('#password', USOS_PASSWORD || '');

        await page.keyboard.press('Enter');

        await page.waitForNavigation();

        while (true) {
            await page.goto(COURSE_ZAPISY_WF_URL || '');

            await page.waitForSelector('div[data-course-id="279508"]');

            const courseDiv = await page.$('div[data-course-id="279508"]');
            const button = courseDiv ? await courseDiv.$('button') : null;

            if (button) {
                const isDisabled = await button.evaluate(el => el.hasAttribute('disabled'));

                if (isDisabled) {
                    console.log('Button is disabled. Waiting...');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    console.log('Button is enabled. Clicking...');
                    await button.click();
                    break;
                }
            } else {
                console.log('Button not found. Waiting...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await new Promise(resolve => setTimeout(resolve, 10000));
        await browser.close();
    }
}

run().catch(console.error);
