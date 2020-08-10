//imports
const { add } = require('./embeddedFunctions');

//tests initializations
const puppeteer = require('puppeteer');
const { doesNotMatch } = require('assert');
const { title } = require('process');
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

//tests
describe('embedded functions', () => {
    it('test 1', () => {
        let value = add(1, 2);
        expect(value).to.equal(3);
    });
});