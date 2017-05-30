var should = require("chai").should();
var expect = require("chai").expect();
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");
var authorization = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGUyODM4NDdjYzgyNzQzNTExM2YwZDEiLCJpYXQiOjE0OTEyMzk4MzF9.1HMr4V7rR1qusmt7bkoo3RiDFXtUNNRIWr6JmCK5hW8';

describe("User",function(){

    it('register: good request should return a 200 response', function(done){
        server.post('/register')
        .send({ username: 'sjaak', password: 'password', email: 'sjaak@avans.nl' })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .expect(200, done);
    });

    it('register: Bad request should return a 400 response', function(done){
        server.post('/register')
        .send({ username: 'sjaak', password: 'password'})
        .set('Content-type', 'application/x-www-form-urlencoded')
        .expect(400, done);
    });

    it('login: good request should return a 200 response', function(done){
        server.post('/login')
        .send({ username: 'test', password: 'test'})
        .set('Content-type', 'application/x-www-form-urlencoded')
        .expect(200, done);
    });

    it('login: unauthorized login should return a 401 response', function(done){
        server.post('/login')
        .send({ username: 'fakeaccount', password: 'fakeaccount'})
        .set('Content-type', 'application/x-www-form-urlencoded')
        .expect(401, done);
    });

    it('login: Bad request should return a 400 response', function(done){
        server.post('/login')
        .send({ username: 'test'})
        .set('Content-type', 'application/x-www-form-urlencoded')
        .expect(400, done);
    });

});

describe("Birds", function(){

    it('fetching birds should return a 200 response', function(done){
        server.get('/birds')
        .set('Authorization', authorization)
        .expect(200, done);
    })
})

describe("Reports", function(){
    
    it('fetching reports should return a 200 response', function(done){
        server.get('/reports')
        .set('Authorization', authorization)
        .expect(200, done);
    })
})