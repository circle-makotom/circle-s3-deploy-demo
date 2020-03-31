/* eslint-env node, mocha */

const assert = require('assert');
const webdriver = require('selenium-webdriver');
const firefoxDriver = require('selenium-webdriver/firefox');

describe('Meows', function () {
    let driver = null;

    this.timeout(30000);

    before(async function () {
        const fxOptions = new firefoxDriver.Options();

        fxOptions.headless();

        driver = await new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(fxOptions)
            .build();

        await driver.get(`file://${process.env.PWD}/dist/index.html`);
    });

    describe('Meows', function () {
        it('should show a single cat', async function () {
            assert.strictEqual(
                await driver
                    .findElement(webdriver.By.css('div#meows'))
                    .getAttribute('textContent'),
                '🐈'
            );
        });
    });

    describe('More meows', function () {
        it('should show an additional cat without spaces inbetween upon button click', async function () {
            await driver
                .findElement(webdriver.By.css('button#meowBtn'))
                .click();
            assert.strictEqual(
                await driver
                    .findElement(webdriver.By.css('div#meows'))
                    .getAttribute('textContent'),
                '🐈🐈'
            );
        });

        it('should show the third cat without spaces inbetween upon button click', async function () {
            await driver
                .findElement(webdriver.By.css('button#meowBtn'))
                .click();
            assert.strictEqual(
                await driver
                    .findElement(webdriver.By.css('div#meows'))
                    .getAttribute('textContent'),
                '🐈🐈🐈'
            );
        });
    });
});
