var chai = require('chai'),
    chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../app.js');
// var express = require('express');
// var app = express();
// var router = require('../routes/heroes.js')(app);
var HeroesController = require('../controller/heroesController.js');
var HeroesList = require('../model/heroesList.js');
var Hero = require('../model/hero.js');

chai.use(chaiHttp);

describe('Heroes REST API', function() {
  
    describe('GET /', function() {
        it('should return list of heroes', (done) => {
        const heroesControllerStub = {};
        heroesControllerStub.heroes = sinon.spy();
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1'+JSON.stringify(app.heroes.heroesController));
        app.heroes.heroesController = heroesControllerStub; 
        chai.request(app).get("/heroes")
            .end((err, res) => {
            //.then( () => {
                chai.assert(heroesControllerStub.heroes.calledOnce);
                done();
            });
        });
    });
    
    describe('GET /:id', function() {
        it('should return the hero of given ID', (done) => {
            const heroesControllerStub = {};
            heroesControllerStub.getHeroById = sinon.spy();
            app.heroesController = heroesControllerStub; 
            chai.request(app).get("/heroes/1")
                .end((err, res) => {
                    chai.assert(heroesControllerStub.getHeroById.calledOnce)
                    done();
                });
        });
    });
    
    describe('PUT /:id {"id":newId, "name":newName}', function() {
        it('should update hero of given ID', (done) => {
            const heroesControllerStub = {};
            heroesControllerStub.updateHeroById = sinon.spy();
            app.heroesController = heroesControllerStub; 
            chai.request(app).put("/heroes/1").send({id: 1, name: 'superman'})
                .end((err, res) => {
                    chai.assert(heroesControllerStub.updateHeroById.calledOnce);
                    chai.assert(heroesControllerStub.updateHeroById.calledWith(1, 1, "superman"));
                    done();
                });
        });
    });

    describe('POST / {"id":newId, "name":newName}', function() {
        it('should append hero with given ID and name', (done) => {
            const heroesControllerStub = {};
            heroesControllerStub.insertHero = sinon.spy();
            app.heroesController = heroesControllerStub; 
            chai.request(app).post("/heroes").send({id: 1, name: 'superman'})
                .end((err, res) => {
                    chai.assert(heroesControllerStub.insertHero.calledOnce);
                    chai.assert(heroesControllerStub.insertHero.calledWith(1, "superman"));
                    done();
                });
        });
    });

    describe('DELETE /:id', function() {
        it('should delete hero with given ID', (done) => {
            const heroesControllerStub = {};
            heroesControllerStub.deleteHeroById = sinon.spy();
            app.heroesController = heroesControllerStub; 
            chai.request(app).delete("/heroes/1")
                .end((err, res) => {
                    chai.assert(heroesControllerStub.deleteHeroById.calledOnce);
                    chai.assert(heroesControllerStub.deleteHeroById.calledWith(1));
                    done();
                });
        });
    });

    describe('DELETE /?name=(term)', function() {
        it('should return the hero of given name', (done) => {
            const heroesControllerStub = {};
            heroesControllerStub.deleteHeroByName = sinon.spy();
            app.heroesController = heroesControllerStub; 
            chai.request(app).delete("/heroes/?name=superman")
                .end((err, res) => {
                    chai.assert(heroesControllerStub.deleteHeroByName.calledOnce);
                    chai.assert(heroesControllerStub.deleteHeroByName.calledWith("superman"));
                    done();
                });
        });
    });

});