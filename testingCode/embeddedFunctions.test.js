//imports
const { checkDateBeforeCurrentDate, checkIsNotANumber, isValidEmail, containsInput, isValidRepoLink } = require('./embeddedFunctions');

//tests initializations
const puppeteer = require('puppeteer');
const select = require('puppeteer-select');
const { doesNotMatch } = require('assert');
const { title } = require('process');
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

//tests
describe('embedded function tests - used for input validation before passed to firebase', () => {

    it('check if 03/25/2015 is before current date - must return true', () => {
        let date = new Date("03/25/2015");
        let value = checkDateBeforeCurrentDate(date);
        expect(value).to.equal(true);
    });

    it('check if 03/25/2021 is before current date  - must return false', () => {
        //javascript format dd/mm/yy...
        let date = new Date("03/25/2021");
        let value = checkDateBeforeCurrentDate(date);
        expect(value).to.equal(false);
    });

    it('(hello) check if it is not a number - must return true', () => {
        let value = checkIsNotANumber('hello');
        expect(value).to.equal(true);
    });

    it('(hello guys) check if it is not a number - must return true', () => {
        let value = checkIsNotANumber('hello guys');
        expect(value).to.equal(true);
    });

    it('(8) check if it is not a number - must return false', () => {
        let value = checkIsNotANumber('8');
        expect(value).to.equal(false);
    });

    it('(42) check if it is not a number - must return false', () => {
        let value = checkIsNotANumber('42');
        expect(value).to.equal(false);
    });
    it('(hello) check if it is an email - must return false', () => {
        let value = isValidEmail('hello');
        expect(value).to.equal(false);
    });

    it('(hello guys) check if it is an email - must return false', () => {
        let value = isValidEmail('hello guys');
        expect(value).to.equal(false);
    });

    it('(8) check if it is an email - must return false', () => {
        let value = isValidEmail('8');
        expect(value).to.equal(false);
    });

    it('(42) check if it is an email - must return false', () => {
        let value = isValidEmail('42');
        expect(value).to.equal(false);
    });
    it('(tim007@gmail.com) check if it is an email - must return true', () => {
        let value = isValidEmail('tim007@gmail.com');
        expect(value).to.equal(true);
    });

    it('(tim007@gmail . com) check if it is an email - must return false', () => {
        let value = isValidEmail('tim007@gmail . com');
        expect(value).to.equal(false);
    });
    it('(hello guys) check if it has a length bigger than 0 - must return true', () => {
        let value = containsInput('hello guys');
        expect(value).to.equal(true);
    });

    it('() check if it has a length bigger than 0 - must return false', () => {
        let value = containsInput('');
        expect(value).to.equal(false);
    });

    it('(42) check if it has a length bigger than 0 - must return true', () => {
        let value = containsInput('42');
        expect(value).to.equal(true);
    });
    it('(hello guys) check if it is a valid repo link - must return false', () => {
        let value = isValidRepoLink('hello guys');
        expect(value).to.equal(false);
    });

    it('() check if it is a valid repo link - must return false', () => {
        let value = isValidRepoLink('');
        expect(value).to.equal(false);
    });

    it('(42) check it is a valid repo link - must return false', () => {
        let value = isValidRepoLink('42');
        expect(value).to.equal(false);
    });

    it('(www.github.com) check it is a valid repo link - must return false', () => {
        let value = isValidRepoLink('www.github.com');
        expect(value).to.equal(false);
    });

    it('(https://github.com/timothywalters61/SD-Manager/tree/JCR1999/public) check it is a valid repo link - must return true', () => {
        let value = isValidRepoLink('https://github.com/timothywalters61/SD-Manager/tree/JCR1999/public');
        expect(value).to.equal(true);
    });

    it('(wwww.github.com/timothywalters61/SD-Manager/tree/JCR1999/public) check it is a valid repo link - must return false', () => {
        let value = isValidRepoLink('www.github.com/timothywalters61/SD-Manager/tree/JCR1999/public');
        expect(value).to.equal(false);
    });

    it('(https://github/timothywalters61/) check it is a valid repo link - must return false', () => {
        let value = isValidRepoLink('https://github/timothywalters61/');
        expect(value).to.equal(false);
    });
});


describe('end to end tests - used to check business logic with javascript and firebase', () => {

    it('(valid input) log in and create new project, sprint, user story and task, must return true', async () => {
        const browser = await puppeteer.launch({
            headless: true, //must be set to true for circleci to work!
            slowMo: 25,
            args: ['--window-size=1440,900']
        });
        const page = await browser.newPage();
        await page.goto(
            'https://scrum-manager-91e13.web.app/'
        );
        //log in process
        await page.click('#loginBtn');
        await page.click('#login-email');
        await page.type('#login-email', 'test1@gmail.com');
        await page.click('#login-password');
        await page.type('#login-password', '12345678');
        await page.click('#login-button');
        await page.waitFor(5000);
        //await page.waitFor(4000);

        // //create project
        // await page.click('#createProject');
        // await page.waitFor(2500);

        // //enter project details
        // await page.click('#create-form > div:nth-child(1) > #projectName');
        // await page.type('#create-form > div:nth-child(1) > #projectName', 'test1Project');
        // await page.type('#create-form > div:nth-child(2) > #projectDescription', 'test1Project');
        // await page.type('#create-form > div:nth-child(3) > #gitLink', 'https://github.com/timothywalters61/SD-Manager');
        // await page.click('#create-form > #createProject-button');
        // await page.waitFor(5000);

        // //create sprint
        // await page.click('#contentContainer > div.subNav > ul > #Btn');
        // await page.waitFor(2500);

        // //enter sprint details
        // await page.click('#sprint-form > div:nth-child(1) > #sprint-name');
        // await page.type('#sprint-form > div:nth-child(1) > #sprint-name', 'test1Sprint');
        // await page.click('#sprint-form > div:nth-child(2) > #startDate');
        // // var d1 = new Date(2020, 10, 01, 00, 00, 00, 0);
        // // var d2 = new Date(2020, 10, 10, 00, 00, 00, 0);
        // await page.type('#sprint-form > div:nth-child(2) > #startDate', '2020001010');
        // await page.click('#sprint-form > div:nth-child(3) > #endDate');
        // await page.type('#sprint-form > div:nth-child(3) > #endDate', '2020001020');
        // await page.click('#sprint-form > #createSprint-button');
        // await page.waitFor(5000);

        // //create user story
        // await page.click('#contentContainer > div.subNav > ul > #Btn');
        // await page.waitFor(2500);

        // //enter user story details
        // await page.click('#userStory-form > div:nth-child(1) > #storyTitle');
        // await page.type('#userStory-form > div:nth-child(1) > #storyTitle', 'user story test');
        // await page.click('#userStory-form > div:nth-child(2) > #storyDescription');
        // await page.type('#userStory-form > div:nth-child(2) > #storyDescription', 'user story description');
        // await page.click('#userStory-form > div:nth-child(3) > #Acceptance');
        // await page.type('#userStory-form > div:nth-child(3) > #Acceptance', 'Acceptance');
        // await page.click('#userStory-form > div:nth-child(4) > #points');
        // await page.type('#userStory-form > div:nth-child(4) > #points', '10');
        // await page.click('#userStory-form > #createUserStory-button');
        // await page.waitFor(5000);

        // //select user story
        // await page.click('#NotStarted > div > button:nth-child(5)');
        // await page.waitFor(5000);

        // //create task
        // await page.click('#contentContainer > div.subNav > ul > #Btn');
        // await page.waitFor(2500);

        // //enter task details
        // await page.click('#Task-form > div > #TaskTitle');
        // await page.type('#Task-form > div > #TaskTitle', 'task 1 testing');
        // await page.click('#Task-form > #createTask-button');
        // await page.waitFor(5000);

        await browser.close();
    }, 200000);

    it('(valid input) log in and navigate to new project, sprint, user story and task and delete them all, must return true', async () => {
        const browser = await puppeteer.launch({
            headless: true, //must be set to true for circleci to work!
            slowMo: 25,
            args: ['--window-size=1440,900']
        });
        const page = await browser.newPage();
        await page.goto(
            'https://scrum-manager-91e13.web.app/'
        );
        //log in process
        await page.click('#loginBtn');
        await page.click('#login-email');
        await page.type('#login-email', 'test1@gmail.com');
        await page.click('#login-password');
        await page.type('#login-password', '12345678');
        await page.click('#login-button');
        await page.waitFor(5000);
        //await page.waitFor(4000);

        // //click project
        // await page.click('#projectContainer > div:nth-child(1) > a');
        // await page.waitFor(5000);

        // //click sprint
        // await page.click('#sprintContainer > div > a');
        // await page.waitFor(5000);

        // //click user story tasks
        // await page.click('#NotStarted > div > button:nth-child(5)');
        // await page.waitFor(5000);

        // //delete task
        // await page.click('#btnDelete');
        // await page.waitFor(5000);

        // //go back a page
        // await page.goBack();
        // await page.waitFor(2500);

        // //delete user story
        // await page.click('#NotStarted > div > button:nth-child(6)');
        // await page.waitFor(5000);

        // //go to details
        // await page.click('#contentContainer > div.subNav > ul > li:nth-child(1)');
        // await page.waitFor(5000);

        // //delete project
        // await page.click('#projDetails > div.btnDiv > #delete');
        // await page.waitFor(4000);

        await browser.close();
    }, 200000);

    it('(invalid input) log in and navigate websites functionality, must return true', async () => {
        const browser = await puppeteer.launch({
            headless: true, //must be set to true for circleci to work!
            slowMo: 25,
            args: ['--window-size=1440,900']
        });
        const page = await browser.newPage();
        await page.goto(
            'https://scrum-manager-91e13.web.app/'
        );
        await page.click('#loginBtn');
        await page.click('#login-email');
        await page.type('#login-email', 'test1@gmail.com');
        await page.click('#login-password');
        await page.type('#login-password', '123456');
        await page.click('#login-button');
        // await page.waitForNavigation();
        await page.waitFor(2000)
        const urlPage = page.url();
        console.info(`The title is: ${urlPage}`);

        expect(urlPage).to.not.contain('userHome.html');

        await browser.close();
    }, 200000);
    //end
});