"use strict";

class HeroesController {
    constructor() { 
        this.heroesArray = [
            {"id": 1, name:"superman"}, 
            {"id": 2, name:"batman"}, 
            {"id": 3, name:"green lantern"}
        ];
    }

    get heroes() {
        return this.heroesArray;
    }
    
    getHeroById(id) {  
        var hero = this.heroes.find(hero => hero.id === parseInt(id));
        if(!hero)
            throw "hero not found";
        return hero;
    }

    updateHeroById(originalId, newId, newName){
        var heroIndex = this.heroes.findIndex(hero => hero.id === originalId);    
        if(heroIndex < 0) {
            throw "hero not found";
        }
        if(this.heroes.find(hero => hero.id === newId)) {
            throw "id already exists";
        }
        this.heroes[heroIndex] = {"id": newId, "name": newName};
    }

    insertHero(id, name) {
        if(this.heroes.find(hero => hero.id === id)) {
            return res.status(400).send("hero already exists");
        }
        this.heroes.push({"id": id, "name": name});
    }

    deleteHeroById(id) {
        var index = this.heroes.findIndex(hero => hero.id === id);
        if (index < 0) {
            throw "hero not found";
        }
        this.heroes.splice(index, 1);
    }

    deleteHeroByName(name) {
        var index = this.heroes.findIndex(hero => hero.name === name);
        if (index < 0) {
        throw "hero not found";
        }
        this.heroes.splice(index, 1);
    }
}

module.exports = HeroesController;