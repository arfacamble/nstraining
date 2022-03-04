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
    feedHerbivoreFood: function () {
        zoo.cash -= 200
    }
}

const carnivore = {
    feedCarnivoreFood: function () {
        zoo.cash -= 500
    }
}

const animal = {
    init: function (name, species, isCarnivore = false) {
        this.name = name
        this.species = species
        this.isCarnivore = isCarnivore
        this.hunger = 50
    },
    feed: function () {
        this.hunger -= 5
        if (this.isCarnivore) {
            carnivore.feedCarnivoreFood()
        } else {
            herbivore.feedHerbivoreFood()
        }
        console.log(`You have fed a ${this.species} called ${this.name}. It still has ${this.hunger} hunger score. The zoo has ${zoo.cash} smackeroos remaining`)
    }
};

var bob = Object.create(animal)
bob.init("Bob", "Worm")
bob.feed()
bob.feed()
bob.feed()
bob.feed()
bob.feed()
bob.feed()
bob.feed()