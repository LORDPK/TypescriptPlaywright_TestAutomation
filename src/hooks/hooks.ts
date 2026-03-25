import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

setDefaultTimeout(30000);

Before(async function (this: CustomWorld) {
  await this.init();
  await this.context.clearCookies();
});

After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === 'FAILED') {
      const fileName = `screenshots/${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g,'_')}-${Date.now()}.png`;

      const screenshot = await this.page.screenshot({
        path: fileName,
        fullPage: true
      });

      this.attach(screenshot, 'image/png');
    }
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    if (this.page) {
      await this.page.close().catch(() => {});
    }

    if (this.context) {
      await this.context.close().catch(() => {});
    }

    if (this.browser) {
      await this.browser.close().catch(() => {});
    }
  }
});