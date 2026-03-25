import { setWorldConstructor, World } from '@cucumber/cucumber';
import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from '@playwright/test';

import { loadConfig, EnvironmentConfig } from '../config/config';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  config!: EnvironmentConfig;

  async init() {
    this.config = loadConfig();

    const browserType = {
      chromium,
      firefox,
      webkit,
    }[this.config.browser];

    this.browser = await browserType.launch({
      headless: this.config.headless,
    });

    this.context = await this.browser.newContext({
      viewport: {
        width: 1920,
        height: 1080
      }
    });

    this.page = await this.context.newPage();
  }
}

setWorldConstructor(CustomWorld);