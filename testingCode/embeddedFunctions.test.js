//imports
const { checkDateBeforeCurrentDate,checkIsNotANumber, isValidEmail, containsInput } = require('./embeddedFunctions');

//tests initializations
const puppeteer = require('puppeteer');
const { doesNotMatch } = require('assert');
const { title } = require('process');
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

//tests
describe('embedded function tests - used for input validation before passed to firebase', () => {

    it('check if 03/25/2015 is before current date - must return false', () => {
        let date = new Date("03/25/2015");
        let value=checkDateBeforeCurrentDate(date);
        expect(value).to.equal(true);
    });

    it('check if 03/25/2021 is before current date  - must return true', () => {
        //javascript format dd/mm/yy...
        let date = new Date("03/25/2021");
        let value=checkDateBeforeCurrentDate(date);
        expect(value).to.equal(false);
    });

    it('(hello) check if it is not a number - must return true', () => {
        let value=checkIsNotANumber('hello');
        expect(value).to.equal(true);
    });

    it('(hello guys) check if it is not a number - must return true', () => {
        let value=checkIsNotANumber('hello guys');
        expect(value).to.equal(true);
    });

    it('(8) check if it is not a number - must return false', () => {
        let value=checkIsNotANumber('8');
        expect(value).to.equal(false);
    });

    it('(42) check if it is not a number - must return false', () => {
        let value=checkIsNotANumber('42');
        expect(value).to.equal(false);
    });
    it('(hello) check if it is an email - must return false', () => {
        let value=isValidEmail('hello');
        expect(value).to.equal(false);
    });

    it('(hello guys) check if it is an email - must return false', () => {
        let value=isValidEmail('hello guys');
        expect(value).to.equal(false);
    });

    it('(8) check if it is an email - must return false', () => {
        let value=isValidEmail('8');
        expect(value).to.equal(false);
    });

    it('(42) check if it is an email - must return false', () => {
        let value=isValidEmail('42');
        expect(value).to.equal(false);
    });
    it('(tim007@gmail.com) check if it is an email - must return true', () => {
        let value=isValidEmail('tim007@gmail.com');
        expect(value).to.equal(true);
    });

    it('(tim007@gmail . com) check if it is an email - must return false', () => {
        let value=isValidEmail('tim007@gmail . com');
        expect(value).to.equal(false);
    });
    it('(hello guys) check if it has a length bigger than 0 - must return true', () => {
        let value=containsInput('hello guys');
        expect(value).to.equal(true);
    });

    it('() check if it has a length bigger than 0 - must return false', () => {
        let value=containsInput('');
        expect(value).to.equal(false);
    });

    it('(42) check if it has a length bigger than 0 - must return true', () => {
        let value=containsInput('42');
        expect(value).to.equal(true);
    });

});

describe('end to end tests - used to check business logic with javascript and firebase', () => {

    it('(valid input) log in and navigate websites functionality, must return true', async() => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 25,
            args: ['--window-size=1440,900']
        });
        const page = await browser.newPage();
        await page.goto(
            'https://scrum-manager-91e13.web.app/'
        );
        await page.click('#loginBtn');
        await page.click('#login-email');
        await page.type('#login-email', 'timothywalters@gmail.com');
        await page.click('#login-password');
        await page.type('#login-password', '12345678');
        await page.click('#login-button');
        await page.waitForNavigation();

        const urlPage = page.url();
        console.info(`The title is: ${urlPage}`);

        expect(urlPage).to.contain('userHome.html');
    
        await browser.close();
    }, 60000);

    it('(invalid input) log in and navigate websites functionality, must return true', async() => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 25,
            args: ['--window-size=1440,900']
        });
        const page = await browser.newPage();
        await page.goto(
            'https://scrum-manager-91e13.web.app/'
        );
        await page.click('#loginBtn');
        await page.click('#login-email');
        await page.type('#login-email', 'timothywalters@gmail.com');
        await page.click('#login-password');
        await page.type('#login-password', '123456');
        await page.click('#login-button');
        // await page.waitForNavigation();
        await page.waitFor(2000)
        const urlPage = page.url();
        console.info(`The title is: ${urlPage}`);
        
        expect(urlPage).to.not.contain('userHome.html');
    
        await browser.close();
    }, 60000);

});