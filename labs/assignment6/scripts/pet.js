/*
 * Virtual Pet App with User Interface - Template
 *
 */
'use strict';
// Create the pet protoptype
var pet = {
    hungry: true,
    unhealthy: false,
    name: 'Your Pet'
};
pet.feed = function () {
    // The pet is no longer hungry.
    // Return a string indicating that the pet is full. 
    this.hungry = false;
    return this.name + ' is full.';
};
pet.newDay = function () {
    // Set ALL the boolean properties to true.
    // Return 'Good morning!'
    for (var prop in this) {
        if (typeof this[prop] === 'boolean') {
            this[prop] = true;
        }
    }

    return 'Good morning!';
};
pet.check = function () {
    // Check ALL the boolean properties of the pet object.
    // Return true if the pet needs attention 
    // Return false if the pet is fine.
    var result = false;
    for (var prop in this) {
        if (this[prop] === true) {
            result = true;
        }
    }
    return result;
};
// Create the fish prototype. 
var fish = Object.create(pet);
fish.cleanTank = function () {
    // Set the object unhealthy property to False.    
    // Return a string of the form: 'pet name likes the clean tank.'
    this.unhealthy = false;
    return this.name + ' likes the clean tank.';
};
// Create the dog prototype. 
var dog = Object.create(pet);
// initialize the lonely property
dog.lonely = false;
dog.walk = function () {
    // Set the object's unhealthy property to false.
    // Return a string of the form: 'pet name enjoyed the walk!'
    this.unhealthy = false;
    return this.name + ' enjoyed the walk!';
};
dog.play = function () {
    // Set the object's lonely property to False.
    // Return a string of the form:  'pet name loves you.'
    this.lonely = false;
    return this.name + ' loves you.';
};

// New code starts here
function adoptPet(event) {
    var myPet;    // this is the adopted pet.
     // the species of the adopted pet (fish or dog?) is the id of the image that is clicked.
    var species = event.target.id;

    //console.log(species);
    // additional function declarations go here
    // these functions have access to the variables myPet and species

    // create the pet object  
    if (species === 'dog') {
        myPet = Object.create(dog);
    } else if (species === 'fish') {
        myPet = Object.create(fish); 
    } else {  // for future extensions
        myPet = Object.create(pet);        
    }
    // Enter the rest of your code here

    // hide the pet that wasn't selected
    hidePet(species);

    // show the appropriate interaction buttons
    showButtons(species);

    //console.log(myPet);

    // show the appropriate animations for the new day
    setInterval(function () { startNewDay(myPet, species)}, 60000);
    // init it for the first time
    startNewDay(myPet, species);

    // register event listener for button
    document.getElementById("action").addEventListener('click', function (event) { handleAction(event, myPet, species)}, false);

    
}

// Register pet adoption event handler
document.getElementById('choice').addEventListener('click', adoptPet, false);

function startNewDay(myPet, species) {
    console.log("SKFJSKL");
    document.body.className = "day";
    setTimeout(startNight,30000);

    myPet.newDay();
    move(species);

}

function startNight() {
    document.body.className = "night";
}

function hidePet(species) {
    document.getElementById("adopt").className = "disappear";
    var items = document.getElementById("choice").children;
    for (var i=0;i<items.length;i++) {
        if (items[i].getAttribute('id') != species) {
            items[i].className = 'disappear';
        }
    }
}

function showButtons(species) {
    if (species === 'dog') {
        document.getElementById("feed").className = "";
        document.getElementById("walk").className = "";
        document.getElementById("play").className = "";
        document.getElementById("clean").className = "disappear";
    } else {
        document.getElementById("feed").className = "";
        document.getElementById("walk").className = "disappear";
        document.getElementById("play").className = "disappear";
        document.getElementById("clean").className = "";
    }
}

function move(species) {
    // change the className to 'move' in order to move the ball
    // console.log("SPECIES",species);
    document.getElementById(species).className = 'move';
}

function stop(species) {
    // change the className to 'move' in order to move the ball
    document.getElementById(species).className = 'stop';
}

function handleAction(event, myPet, species) {
//    console.log(event.target.id);
//    console.log(myPet);
//    console.log(species);

    // process the action initiated by the corresponding button
    // the event target here is one of the action buttons.
    if (event.target.id === "feed") {
        myPet.feed();
    } else if (event.target.id === "play") {
        myPet.play();
    } else if (event.target.id === "walk") {
        myPet.walk();
    } else if (event.target.id === "clean") {
        myPet.cleanTank();
    }

//    console.log(myPet.check());
    // stop the pet from moving
    if (!myPet.check()) {
        stop(species);
    }

}