# Playwright Test Suite for EpicBet

## Overview
This repository contains an automated test suite built using [Playwright](https://playwright.dev/) to validate critical functionalities of the [Epicbet](https://www.epicbet.com/) sportsbook web application. These tests focus on ensuring the reliability and correctness of the application's key features.

---

## Features
- Automated tests written in **JavaScript** using **Playwright**.
- Validates core functionalities 
- Well-structured and maintainable test project for scalability.

---

## Test Scenarios
### 1. **404 Error Page Validation**
   - Confirms that the 404 error page displays the error message.
   - Verifies that incorrect url leads to the error page.

### 2. **Home Screen Button Validation**
   - Confirms that these buttons appear on the home screen..

### 3. **Responsive Visibility**
   - Confirms that the mobile menu button is visible in a mobile screen size.
   - Confirms that the desctop menu buttons are visible in a desctop screen size.

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher).
- A package manager like `npm` or `yarn`.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/t6nislille/TestingWithPlaywright.git

2. Navigate to the project directory:
    ```bash 
    cd TestingWithPlaywright

3. Install dependencies:
   ```bash
   npm install
    ```

## Running Tests
### Execute All Tests
```bash
npx playwright test
```
### Execute a Specific Test
```bash
npx playwright <test-file-name>.spec.js
```
### Execute Tests in Headed Mode
```bash
npx playwright test --headed
```
### View Test Results
```bash
npx playwright show-report
```

## Playwright Configuration
This project uses a default configuration. Key settings include:

- Test directory: `tests`
- Browsers: Chromium, Firefox, WebKit
- Reporters: HTML and terminal

You can modify these settings in `playwright.config.js`

## Debugging Tips
- Use the `--debug` flag for debugging
```bash
npx playwright test --debug