import { Browser, chromium, firefox, Page, webkit } from 'playwright';

for (const browserType of [chromium, firefox, webkit]) {
  describe(`(${browserType.name()}): Angular app homepage`, () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
      browser = await browserType.launch({ headless: false });
      page = await browser.newPage();
    });

    it('Should display the correct page title', async () => {
      await page.goto('http://localhost:4200');
      expect(await page.title()).toBe('PlaywrightAngularTest');
    });

    it('Should display welcome message', async () => {
      await page.goto('http://localhost:4200');
      const titleBannerContents = await page.$eval(
        'app-root .content .highlight-card span',
        (el: HTMLElement) => el.innerText
      );
      expect(titleBannerContents).toBe(
        'playwright-angular-test app is running!'
      );
    });

    it('Should display Angular Blog link', async () => {
      await page.goto('http://localhost:4200');
      const titleBannerContents = await page.waitForSelector(
        'app-root .content .card-container a:nth-child(3) span'
      );
      const [, popup] = await Promise.all([
        titleBannerContents.click(),
        page.waitForEvent('popup'),
      ]);
      expect(await popup.title()).toBe('Angular Blog');
    });

    afterAll(async () => {
      await browser.close();
    });
  });
}
