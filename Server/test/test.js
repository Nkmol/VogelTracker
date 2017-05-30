var should = require("chai").should();
var expect = require("chai").expect();
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");

describe("User",function(){

    it('should return a 200 response', function(done){
        server.post('/register')
        .send({ username: 'sjaak', password: 'password', email: 'sjaak@avans.nl' })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .expect(200, done);
    })

});