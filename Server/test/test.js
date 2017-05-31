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

    it('Put a single bird should return a 200 response', function(done){
        server.put('/birds/' + "5917775dffd6a211d345e556")
        .send({
            _id : "5917775dffd6a211d345e556",
            latin_name: "(Great) Cormorant, Phalacrocorax carbo",
            information: "Een sigaar met vleugels - dat is typisch een aalscholver in vlucht. Het zijn onmiskenbare vogels, mede door de lange snavel met haakpunt. Aalscholvers zijn koloniebroeders. Het menu bestaat uitsluitend uit vis. In tegenstelling tot wat de naam doet vermoeden vormt paling slechts een zeer klein deel van het menu. Uit onderzoek is gebleken dat vooral brasem wordt gegeten, die in groten getale uit het IJsselmeer worden gevist. Commercieel gezien is de brasem niet interessant en aalscholvers vormen dus niet of nauwelijks een bron van concurrentie met de binnenvisserij. Door vermeende concurrentie werden aalscholvers verguisd en afgeschilderd als visstropers.\nIn tegenstelling tot vrijwel alle andere watervogels bevat hun verenkleed slechts zeer weinig vet. Daardoor is het niet waterdicht en wordt een duikende aalscholver drijfnat. Na een duik moet een aalscholver dus drogen. Dit doen ze door met half gespreide vleugels op een paal of in een boom te gaan zitten; een zeer markante houding.",
            name: "Aalscholver",
            trend_and_amount: "Sinds 1970 is de aalscholverpopulatie fors toegenomen, na eerder door een diep dal gegaan te zijn. De stand heeft zich sinds de jaren '90 min of meer gestabiliseerd rond de 19.000 tot 20.000 paren. Deze broeden voornamelijk in het IJsselmeergebied, het rivierengebied en in de plassen- en merengebieden." 
        })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('Put a single bird should return a 401 response when unauthorized', function(done){
        server.put('/birds/' + "5917775dffd6a211d345e556")
        .send({
            _id : "5917775dffd6a211d345e556",
            latin_name: "(Great) Cormorant, Phalacrocorax carbo",
            information: "Een sigaar met vleugels - dat is typisch een aalscholver in vlucht. Het zijn onmiskenbare vogels, mede door de lange snavel met haakpunt. Aalscholvers zijn koloniebroeders. Het menu bestaat uitsluitend uit vis. In tegenstelling tot wat de naam doet vermoeden vormt paling slechts een zeer klein deel van het menu. Uit onderzoek is gebleken dat vooral brasem wordt gegeten, die in groten getale uit het IJsselmeer worden gevist. Commercieel gezien is de brasem niet interessant en aalscholvers vormen dus niet of nauwelijks een bron van concurrentie met de binnenvisserij. Door vermeende concurrentie werden aalscholvers verguisd en afgeschilderd als visstropers.\nIn tegenstelling tot vrijwel alle andere watervogels bevat hun verenkleed slechts zeer weinig vet. Daardoor is het niet waterdicht en wordt een duikende aalscholver drijfnat. Na een duik moet een aalscholver dus drogen. Dit doen ze door met half gespreide vleugels op een paal of in een boom te gaan zitten; een zeer markante houding.",
            name: "Aalscholver",
            trend_and_amount: "Sinds 1970 is de aalscholverpopulatie fors toegenomen, na eerder door een diep dal gegaan te zijn. De stand heeft zich sinds de jaren '90 min of meer gestabiliseerd rond de 19.000 tot 20.000 paren. Deze broeden voornamelijk in het IJsselmeergebied, het rivierengebied en in de plassen- en merengebieden." 
        })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', "")
        .expect(401, done);
    })

    it('Put a single bird should return a 400 response without proper id', function(done){
        server.put('/birds/' + "5917775dffd6a211d345e556")
        .send({
            _id : "zz",
            latin_name: "(Great) Cormorant, Phalacrocorax carbo",
            information: "Een sigaar met vleugels - dat is typisch een aalscholver in vlucht. Het zijn onmiskenbare vogels, mede door de lange snavel met haakpunt. Aalscholvers zijn koloniebroeders. Het menu bestaat uitsluitend uit vis. In tegenstelling tot wat de naam doet vermoeden vormt paling slechts een zeer klein deel van het menu. Uit onderzoek is gebleken dat vooral brasem wordt gegeten, die in groten getale uit het IJsselmeer worden gevist. Commercieel gezien is de brasem niet interessant en aalscholvers vormen dus niet of nauwelijks een bron van concurrentie met de binnenvisserij. Door vermeende concurrentie werden aalscholvers verguisd en afgeschilderd als visstropers.\nIn tegenstelling tot vrijwel alle andere watervogels bevat hun verenkleed slechts zeer weinig vet. Daardoor is het niet waterdicht en wordt een duikende aalscholver drijfnat. Na een duik moet een aalscholver dus drogen. Dit doen ze door met half gespreide vleugels op een paal of in een boom te gaan zitten; een zeer markante houding.",
            name: "Aalscholver",
            trend_and_amount: "Sinds 1970 is de aalscholverpopulatie fors toegenomen, na eerder door een diep dal gegaan te zijn. De stand heeft zich sinds de jaren '90 min of meer gestabiliseerd rond de 19.000 tot 20.000 paren. Deze broeden voornamelijk in het IJsselmeergebied, het rivierengebied en in de plassen- en merengebieden." 
        })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorization)
        .expect(400, done);
    })

    it('Put a single bird without content should return a 204 response', function(done){
        server.put('/birds/:id')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorization)
        .expect(204, done);
    })

    it('Patch a single bird should return a 200 response', function(done){
        server.patch('/birds/' + "5917775dffd6a211d345e556")
        .send({
            _id : "5917775dffd6a211d345e556",
            latin_name: "(Great) Cormorant, Phalacrocorax carbo"        
        })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorization)
        .expect(200, done);
    })

    it('Patch a single bird should return a 401 response without authorization', function(done){
        server.patch('/birds/' + "5917775dffd6a211d345e556")
        .send({
            _id : "5917775dffd6a211d345e556",
            latin_name: "(Great) Cormorant, Phalacrocorax carbo"        
        })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', "")
        .expect(401, done);
    })

    it('Patch a single bird should return a 400 response without content', function(done){
        server.patch('/birds/' + "5917775dffd6a211d345e556")
        .send({
            id: "zz"     
        })
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorization)
        .expect(400, done);
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