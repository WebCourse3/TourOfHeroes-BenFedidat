"use strict";
var Hero = require('./hero.js');

class HeroesList {
    constructor() {
        this.heroesArray = [];
    }
    
    get heroes() {
        return this.heroesArray;
    }
}

module.exports = HeroesList;