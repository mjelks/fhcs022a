/**
 * Created by mjelks on 4/29/14.
 *
 */

'use strict';

var pet = {
  hungry : true,
  unhealthy : false,
  name : 'Your Pet',
  feed : function() {
    this.hungry = false;
    return this.name + " is full.";
  },
  check : function () {
      var status = '';
      for (var prop in this) {
          if(typeof this[prop] == "boolean" && this[prop] === true) {
              status += this.name + " is "+ prop.toString() +"! ";
          }
      }
      if (status == '') {
          status = this.name + " is fine.";
      }
      return status;
  },
  newDay : function () {
    for (var prop in this) {
        if(typeof this[prop] == "boolean") {
            this[prop] = true;
        }
    }
    return 'Good morning! ';
  }
};


var fish = Object.create(pet);
fish.cleanTank = function() {
    this.unhealthy = false;
    return this.name + " likes the clean tank. ";
};

var dog = Object.create(pet);
dog.lonely = false;
dog.walk = function() {
    this.unhealthy = false;
    return this.name + " enjoyed the walk! ";
};
dog.play = function() {
    this.lonely = false;
    return this.name + " loves you. ";
};

/** TESTING PROCEEDS BELOW **/

// Create a dog and a fish pet objects.
var myDog = Object.create(dog);
myDog.name = 'Fido';
var myFish = Object.create(fish);
myFish.name = 'Wanda'
console.log(myDog.check());      // Fido is hungry.
console.log(myDog.feed());       // Fido is full.
console.log(myDog.check());      // Fido is fine.
console.log(myFish.check());     // Wanda is hungry.
console.log(myFish.feed());      // Wanda is full.
console.log(myFish.check());     // Wanda is fine.
console.log(myDog.newDay());     // Good morning!
console.log(myFish.newDay());    // Good morning!
console.log(myDog.check());      // Fido is hungry. Fido is lonely. Fido is unhealthy.
console.log(myDog.feed());       // Fido is full.
console.log(myDog.check());      // Fido is lonely. Fido is unhealthy.
console.log(myDog.play());       // Fido loves you.
console.log(myDog.check());      // Fido is unhealthy.
console.log(myDog.walk());       // Fido enjoyed the walk!
console.log(myDog.check());      // Fido is fine.
console.log(myFish.check());     // Wanda is hungry. Wanda is unhealthy.
console.log(myFish.feed());      // Wanda is full.
console.log(myFish.check());     // Wanda is unhealthy.
console.log(myFish.cleanTank()); // Wanda likes the clean tank.
console.log(myFish.check());     // Wanda is fine.
console.log(myDog.check());      // Fido is fine.
console.log(myDog.walk());       // Fido enjoyed the walk!
// Create a fish with no name
var myNewFish = Object.create(fish);
console.log(myNewFish.check());  // Your Pet is hungry.
// Create a new boolean property for myNewFish
myNewFish.bored = false;
console.log(myNewFish.newDay()); // Your Pet is hungry.
console.log(myNewFish.check());  // Your Pet is bored. Your Pet is hungry. Your Pet is unhealthy.

/** END TESTING **/