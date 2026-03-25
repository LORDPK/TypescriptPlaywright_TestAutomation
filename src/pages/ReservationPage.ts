import { Page, Locator, expect } from '@playwright/test';

export class ReservationPage {    
  private readonly page: Page;
  //Locators
  private readonly ReserveNowButton: Locator;
  private readonly firstnameInput: Locator;
  private readonly lastnameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.ReserveNowButton = page.getByRole('button', { name: 'Reserve Now' });
    this.firstnameInput = page.getByPlaceholder('Firstname');
    this.lastnameInput = page.getByPlaceholder('Lastname');
    this.emailInput = page.getByPlaceholder('Email');
    this.phoneInput = page.getByPlaceholder('Phone');
    this.confirmationMessage = page.getByRole('heading', { name: 'Booking Confirmed' })
  }

  async navigate(baseUrl: string) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterFirstName(firstName: string) {
    await this.firstnameInput.waitFor({ state: 'visible', timeout: 1000 });    
    await this.firstnameInput.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastnameInput.waitFor({ state: 'visible', timeout: 1000 });
    await this.lastnameInput.fill(lastName);
  }

  async enterEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 1000 });    
    await this.emailInput.fill(email);
  }

  async enterPhone(phone: string) {
    await this.phoneInput.waitFor({ state: 'visible', timeout: 1000 });
    await this.phoneInput.fill(phone);
  }

  async clickReserveNow() {
    await this.ReserveNowButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.ReserveNowButton.click();
  }

  async waitForBookingConfirmationAPIResponse() {
    await this.page.waitForResponse(resp =>
      resp.url().includes('/api/booking') &&
      resp.request().method() === 'POST' &&
      resp.status() === 201
    );
  }

  async assertConfirmationMessageShouldBeVisible() {    
    await expect(this.confirmationMessage).toBeVisible();
  }

  async assertBookingDatesAreTheExpected(checkInDate: Date, checkOutDate: Date) {
    await expect(this.page.getByText(checkInDate.toLocaleDateString("dd/MM/yyyy").toString())).toBeVisible();
    await expect(this.page.getByText(checkOutDate.toLocaleDateString("dd/MM/yyyy").toString())).toBeVisible();
  }
}