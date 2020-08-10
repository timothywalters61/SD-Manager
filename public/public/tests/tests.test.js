//imports
const { add} = require('./tests');

//tests initializations
const puppeteer = require('puppeteer');
const { doesNotMatch } = require('assert');
const { title } = require('process');

//tests
test('test 1', () => {
    let value = add(1, 2);
    expect(value).toBe(3);
});