import { Page, Locator, expect } from '@playwright/test';

export class MainPage {
  private readonly page: Page;

  //Locators
  private readonly checkInDateInput: Locator;
  private readonly checkOutDateInput: Locator;
  private readonly checkAvailabilityButton: Locator;
  private readonly BookFirstRoomAvailable: Locator;
  private readonly ErrorDateMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkInDateInput = page.locator("(//*[contains(@class, 'input-container')]/input)[1]");
    this.checkOutDateInput = page.locator("(//*[contains(@class, 'input-container')]/input)[2]");
    this.checkAvailabilityButton = page.getByRole('button', { name: 'Check Availability' });
    this.BookFirstRoomAvailable = this.page.locator('.room-card').first().getByRole('link', { name: 'Book now' });
    this.ErrorDateMessage = this.page.locator('.error-message');
  }

  async navigate(baseUrl: string) {
    await this.page.goto(`${baseUrl}`);
  }

  async enterCheckinDate(checkInDate: Date) {
    await this.checkInDateInput.waitFor({ state: 'visible', timeout: 5000 }); 
    await this.checkOutDateInput.fill('');
    await this.checkInDateInput.fill(checkInDate.toLocaleDateString("en-GB")); 
  }

  async enterCheckoutDate(checkOutDate: Date) {
    await this.checkOutDateInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.checkOutDateInput.fill('');
    await this.checkOutDateInput.fill(checkOutDate.toLocaleDateString("en-GB"));
  }

  async clickcheckAvailabilityButton() {
    await this.checkAvailabilityButton.click();
  }
  
  async checkAvailabilityProcess(checkInDate: Date, checkOutDate: Date) {
    await this.enterCheckinDate(checkInDate);
    await this.enterCheckoutDate(checkOutDate);
    await this.clickcheckAvailabilityButton();
  }

  async clickBookFirstRoomAvailable() {    
    await Promise.all([
      this.page.waitForResponse(resp =>
        resp.url().includes('/api/room') &&
        resp.request().method() === 'GET' &&
        resp.status() === 200
      ),
      this.BookFirstRoomAvailable.click()]);
  }

  async asserDateErrorVisible() {
    await expect(this.ErrorDateMessage).toBeVisible();
  }
}