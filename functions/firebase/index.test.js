log = console.log
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

const {
    getSignIn,createUser1,createProject1,getProjects1,addMemberToProject1, addSprint1,getSprints1 ,createUserStory1, getUserStories1, createTask1,getTasks1
} = require('./tests')

var email='tim007jb@gmail.com';
var password='12345678';

describe('auth.js functions', () => {
    it('Should sign in user', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(getSignIn(email,password)).to.equal(email+password);
    });
    
});

describe('signup.js functions', () => {
    it('Should create user document', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(createUser1(email,password)).to.equal(0);
        expect(getUserStories1(email,password)).to.equal(0);
        
    });
    // it('email + password', () => {
    //     let sum = email+password;
    //     sum.should.equal('tim007jb@gmail.com12345678');
    // });
    // it('expect true to be true', () => {
        
    //     expect(true).to.be.true;
    // });
});



describe('projects.js functions', () => {
    it('Should create new project', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(createProject1(email,password)).to.equal(0);
        
    });
    it('Should retrieve list of projects', () => {
        let sum = email+password;
        expect(getProjects1(email,password)).to.equal(0);
        
    });
    it('Should add a member to an existing project', () => {
        let sum = email+password;
        expect(createProject1(email,password)).to.equal(0);
        
    });
    
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
});

describe('sprints.js functions', () => {

    it('Should create new sprint', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(addMemberToProject1(email,password)).to.equal(0);
       
    });
    it('Should display sprints', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(addSprint1(email,password)).to.equal(0);
       
    });
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
});

describe('userstories.js functions', () => {
    it('Should create new user story', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(getSprints1(email,password)).to.equal(0);
        
    });
    it('Should display user stories', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(createUserStory1(email,password)).to.equal(0);
        
    });
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
});

describe('tasks.js functions', () => {
    it('Should create new task', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(createTask1(email,password)).to.equal(0);
        
    });
    it('Should display tasks', ()=>{
        //expect(getSignUp(email,password)).to.equal(email+password);
        expect(getTasks1(email,password)).to.equal(0);
        
    });
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){

    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
    if(email==''){
        
    }
});