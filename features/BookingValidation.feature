Feature: Booking and Availability Validation
  As a user of Shady Meadows B&B
  I want to book rooms and check availability
  So that I can make valid reservations

  Background:
    Given the user is on the main page

  @booking
  Scenario: Full booking process with valid data
    When the user selects a check-in date 5 day from today
    And the user selects a check-out date 8 days from today
    And the user clicks on Check Availability
    And the user clicks Book now on an available room
    And the user clicks Reserve Now
    And the user enters first name, last name, email, and phone number
    And the user clicks Reserve Now
    Then a confirmation message is displayed with the booking details

  Scenario: Check Availability requires check-in before check-out
    When the user selects a check-in date 10 days from today
    And the user selects a check-out date 5 days from today
    And the user clicks on Check Availability
    Then an error message is displayed saying check-in must be before check-out