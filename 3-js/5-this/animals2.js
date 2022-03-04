const zoo = {
    cash: 4000,
    spend: function (amount) {
        if (this.cash < amount) {
            throw "Not enough money!";
        }
        this.cash -= amount;
        console.log(`Remaining funds: ${this.cash}`);
    }
};

const herbivore = {
    init: function (name, species) {
        this.name = name
        this.species = species
        this.hunger = 50
    },

    feedHerbivoreFood: function () {
        zoo.cash -= 200
    },

    feed: function () {
        this.hunger -= 5
        this.feedHerbivoreFood()
        console.log(`You have fed a ${this.species} called ${this.name}. It still has ${this.hunger} hunger score. The zoo has ${zoo.cash} smackeroos remaining`)
    }
}

const carnivore = {
    init: function (name, species) {
        this.name = name
        this.species = species
        this.hunger = 50
    },

    feedCarnivoreFood: function () {
        zoo.cash -= 500
    },

    feed: function () {
        this.hunger -= 5
        this.feedCarnivoreFood()
        console.log(`You have fed a ${this.species} called ${this.name}. It still has ${this.hunger} hunger score. The zoo has ${zoo.cash} smackeroos remaining`)
    }
}

const animalCreator = {
    createAnimal: function(name, speciesName, animalType) {
        const animal = Object.create(animalType);
        animal.init(name, speciesName);
        return animal;
    },

    createZebra: function (name) {
        return this.createAnimal(name, "Zebra", herbivore)
    },

    createLion: function (name) {
        return this.createAnimal(name, "Lion", herbivore)
    },

    createChinchilla: function (name) {
        return this.createAnimal(name, "Chinchilla", herbivore)
    },
    
    createFerret: function (name) {
        return this.createAnimal(name, "Ferret", herbivore)
    },
};

function getButton(index) {
    return /* Gets the button at place `index` */;
}

// So that you can use it like:
const zebraButton = getButton(0);
const bobTheZebra = zebraButton.onClick('Bob');

bobTheZebra.feedHerbivoreFood();

var god = Object.create(animalCreator)
sally = god.createChinchilla("Sally")
sally.feed()