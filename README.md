# Polaris using Playwright

## Description

This project is for Polaris using Microsoft Playwright in TypeScript.

## Prerequisites

You need the following prerequisites installed on your device to be able to run and contribute to this project:

1. Git -> [Download Git](https://git-scm.com/downloads) or [Download GitHub Desktop](https://desktop.github.com/)
2. Visual Studio Code -> [Download VSCode](https://code.visualstudio.com/download)
3. NodeJS -> [Download NodeJS](https://nodejs.org/en/download/)
4. Playwright -> [Installing Playwright for VS Code](https://playwright.dev/docs/getting-started-vscode)
5. allure-playwright -> [Installing allure-playwright reporter](https://www.npmjs.com/package/allure-playwright)

\*Note: Always make sure to download the latest stable version compatible with your OS and CPU architecture.

## Using This project

1. Clone the project using GitHub Dekstop.
2. Ensure that you've installed the official Playwright VS Code plugin, and ran `npm install` in the project root directory.
3. Open the project folder in VS Code by clicking `File > Open Folder...`.
4. Jump to the [Test Execution and Reporting](#reporting) section to execute your code.

## Getting Started with a new Playwright project from scratch

1. Create new test specs under the `tests/` directory following the `lowerCamelCase.e2e.ts` naming convention. Sub directories can be created for each testing scope.
2. Make sure to add a test description and use allure annotations `allure.feature()` and `allure.description()`.
3. After you create a new linear test, you need to split it using `test.step()` into clear steps, and use Given/When/Then/And to describe your steps.
4. Follow the Playwright user guide to ensure that you're applying the [Page Object Model](https://playwright.dev/docs/pom) design pattern properly.
5. Page files should be created under the `pages/` directory following the `lowerCamelCase.ts` naming convention. Sub directories can be created for each application module.

## Managing Test Data

1. Create new test data ts file under the `fixtures/` directory following the `someTestdata.ts` naming convention. Sub directories can be created for each testing scope.
2. This is what a `someTestdata.ts` should look like:<br/>

```JSON
{
  "google": {
    "search": {
      "query": "Microsoft Playwright"
    }
  }
}
```

3. Add this import to your test spec file

```TypeScript
import fixtures from '../fixtures/google';
```

4. Call the test data directly using autocomplete by following this example

```TypeScript
await test.step('And search for "Microsoft Playwright"', async () => {
  await googleHomePage.searchFor(fixtures.google.search.query);
});
```

## <a name="reporting"></a>Test Execution and Reporting

1. Follow this guide for [Running Tests](https://playwright.dev/docs/getting-started-vscode#running-tests).
2. After Test Execution is completed, you will find all the execution reports under this directory `reports/`.
3. You can generate and serve a temporary allure report by openning a new Terminal session in the project root directory [```Terminal > New Terminal```] and running this command `allure serve reports/allure-results`.
4. You can generate and open a saved allure report by openning a new Terminal session in the project root directory [```Terminal > New Terminal```] and running this command to generate the report `allure generate reports/allure-results -o allure-report --clean` and then this command to open the report `allure open allure-report`.
5. You can open the monocart-report -which provides a lightweight tree view for all your tests in a single file- by opening this file in your preferred browser `reports/monocart-report/report.html`.
6. You can open the native playwright-report by opening this file in your preferred browser `reports/playwright-report/index.html`.
7. You can download the `trace.zip` file from any of the reports, or explore them manually under the `reports/test-artifacts/` directory. To open a playwright trace report you should use your preferred browser to navigating to [Playwright Trace Viewer](https://trace.playwright.dev/), and then drag/drop the trace archive file to open it.

## External References

- [Playwright User Guide](https://playwright.dev/docs/test-annotations)
- [allure-playwright](https://github.com/allure-framework/allure-js/blob/master/packages/allure-playwright/README.md)
- [monocart-reporter](https://github.com/cenfun/monocart-reporter)
- [Getting Started with VS Code](https://playwright.dev/docs/getting-started-vscode)
- [Element Identification / Selectors](https://playwright.dev/docs/selectors)
- [Page Object Model Design Pattern](https://playwright.dev/docs/pom)
- [Running Tests](https://playwright.dev/docs/getting-started-vscode#running-tests)
