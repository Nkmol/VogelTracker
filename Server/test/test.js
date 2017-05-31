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
        server.get('/birds/')
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('fetching birds should return a 401 response if unauthorized', function(done){
        server.get('/birds/')
        .set('Authorization', "")
        .expect(401, done);
    })

    it('fetch a single bird should return a 200 response', function(done){
        server.get('/birds/')
        .send({id : "5917775dffd6a211d345e556" })
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('fetch a single bird without valid "_id" should return a 400 response', function(done){
        server.get('/birds/')
        .send({id : "" })
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('fetching a single bird should return a 401 response if unauthorized', function(done){
        server.get('/birds/')
        .send({_id : "5917775dffd6a211d345e556" })
        .set('Authorization', "")
        .expect(401, done);
    })

    it('Delete a single bird should return a 200 respone', function(done){
        server.delete('/birds/')
        .send({id : "58e763a17cd0d10004957c8f" })
        .set('Authorization', authorization)
        .expect(200, done);
    })
})

describe("Reports", function(){
    
    it('fetching reports should return a 200 response', function(done){
        server.get('/reports/')
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('fetching reports should return a 401 response if unauthorized', function(done){
        server.get('/reports/')
        .set('Authorization', "")
        .expect(401, done);
    })

    it('fetch a single report should return a 200 response', function(done){
        server.get('/reports/')
        .send({_id : "58e763a17cd0d10004957c8f" })
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('fetch a single report without valid "_id" should return a 400 response', function(done){
        server.get('/reports/')
        .send({_id : "" })
        .set('Authorization', authorization)
        .expect(400, done);
    })

    it('fetching a single report should return a 401 response if unauthorized', function(done){
        server.get('/reports/')
        .send({_id : "58e763a17cd0d10004957c8f" })
        .set('Authorization', "")
        .expect(401, done);
    })

    it('create a single report should return a 200 response', function(done){
        server.post('/reports/create/')
        .send({
            description : "ik zag een kraai",
            lat: 22.22222222,
            long: 33.33333333,
            bird_id: "58e281512471d642c9778c6e",
            date: 2017-04-2,
            user_id: "5917775dffd6a211d345e555"

        })
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('delete a single report should return a 200 respone', function(done){
        server.delete('/reports/')
        .send({id : "58e763a17cd0d10004957c8f" })
        .set('Authorization', authorization)
        .expect(200, done);
    })

})