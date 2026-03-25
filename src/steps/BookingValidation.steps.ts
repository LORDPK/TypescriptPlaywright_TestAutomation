import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { MainPage } from '../pages/MainPage'; 
import { ReservationPage } from '../pages/ReservationPage';

let mainPage: MainPage;
let reservationPage: ReservationPage;
let checkInDate: Date;
let checkOutDate: Date;

Given('the user is on the main page', async function (this: CustomWorld) {
  mainPage = new MainPage(this.page);
  await this.page.goto(this.config.baseUrl);
});

When('the user selects a check-in date {int} day(s) from today', async function (this: CustomWorld, days: number) {
  checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + days);
  mainPage.enterCheckinDate(checkInDate);  
});

When('the user selects a check-out date {int} day(s) from today', async function (this: CustomWorld, days: number) {
  checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + days);
  mainPage.enterCheckoutDate(checkOutDate);
});

When('the user clicks on Check Availability', async function (this: CustomWorld) {
  await mainPage.clickcheckAvailabilityButton();
});

When('the user clicks Book now on an available room', async function (this: CustomWorld) {  
  await mainPage.clickBookFirstRoomAvailable();
  reservationPage = new ReservationPage(this.page);
});

When('the user enters first name, last name, email, and phone number', async function (this: CustomWorld) {
  await reservationPage.enterFirstName('John');
  await reservationPage.enterLastName('Doe');
  await reservationPage.enterEmail('john.doe@example.com');
  await reservationPage.enterPhone('12345678901');
});

When('the user clicks Reserve Now', async function (this: CustomWorld) {
  await reservationPage.clickReserveNow();
});

Then('a confirmation message is displayed with the booking details', async function (this: CustomWorld) {
  await reservationPage.waitForBookingConfirmationAPIResponse();
  await reservationPage.assertConfirmationMessageShouldBeVisible();
  await reservationPage.assertBookingDatesAreTheExpected(checkInDate, checkOutDate);
});

Then('an error message is displayed saying check-in must be before check-out', async function (this: CustomWorld) {
  await mainPage.asserDateErrorVisible();
});