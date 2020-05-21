log = console.log
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

const {
    getSignIn,
    getSignUp,
} = require('./tests')

var email='tim007jb@gmail.com';
var password='12345678';

describe('#firebase sign in/out tests', () => {
    it('tim007jb@gmail.com 12345678 should be created in database', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(getSignIn(email,password)).to.equal(email+password);
    });
    it('email + password', () => {
        let sum = email+password;
        sum.should.equal('tim007jb@gmail.com12345678');
      })
    // it('expect true to be true', () => {
        
    //     expect(true).to.be.true;
    // });
});