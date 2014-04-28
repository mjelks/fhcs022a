# Section 3 [ Objects && Properties ]

## Objects

### 5.1 What is an Object?
- unordered collection of properties
- There are 2  syntaxes for accessing the property of an object
  - dot notation : objectName.propertyName
  - array notation : objectName['propertyName']

### 5.2 Creating JS Objects
```javascript
  var hisCar = {make: 'Honda', model: 'Civic'};
```  
### 5.3 Dot vs Square Bracket Notation
- When we use the dot notation, propertyName has to be a valid identifier.
- square bracket notation allows for dynamic keys

examples:
```javascript
  population = { 'San Francisco': 825863, 'San Jose': 982765, 'Santa Clara': 119311, Saratoga: 30677}

  population.Saratoga;
  population['Saratoga'];
  population['Sara' + 'toga'];  

  var city = 'Saratoga';
  population[city];
```
**use square bracket for dynamic keys** 

### 5.4 Methods
- a method is invoked on a particular object
- methods are functions that are attached to objects through a property (in JS)
- When a method is invoked on an object, it has access to the object through the keyword this.
  - invocation context (this is passed implicitly)

```javascript
function depositAmount(amount) {

    this.balance = this.balance + amount; // update the balance

    return this;  // return the updated object

}

var account = {name: 'Alice', balance: 0, deposit: depositAmount};

console.log(account);  // balance is 0

account.deposit(20);

console.log(account); // balance is 0 + 20

account.deposit(50);

console.log(account); // balance is 20 + 50

The following should be displayed on the Firebug console:

Object { name="Alice", balance=0, deposit=depositAmount()}
Object { name="Alice", balance=20, deposit=depositAmount()}
Object { name="Alice", balance=70, deposit=depositAmount()}
```

**this is also valid:**

```javascript
  account =  {
  name: 'Alice',
  balance: 0,
  deposit: function (amount) {
    this.balance = this.balance + amount;
    return this;
  }
};
```
##### Chaining
- you can chain methods (e.g. deposit twice)
```javascript
account.deposit(20).deposit(100);
```

### 5.5 Prototype
- Every object is linked to a prototype object from which it can inherit properties.
- Object.prototype, an object that comes standard with JavaScript
  - denoted by Object{}

#### Object.getPrototypeOf()
```javascript
var herAccount = {'account holder': 'Alice', balance: 300};
console.log(Object.getPrototypeOf(herAccount));
Object { }
```

### 5.6 Creating Objects
- ECMAScript 5.0 recommended method:

```javascript
var car = {mileage: 0};
// syntax : car = Object.create(Object.prototype);
var hondaCar = Object.create(car);
// The object referred to by hondaCar has inherited the mileage property from its prototype car.
//  To add a new property, we just assign a value to it.
hondaCar.make = 'Honda';
// The property is only added to the object itself but not to its prototype.
```

The prototype relationship here is a dynamic relationship.
We can add or remove properties dynamically to the prototype thus affecting an entire set of objects.

```javascript
car.drive = function (distance ) {   // define a drive method for the car object
  this.mileage = this.mileage + distance;
}
```

**The drive method is now visible in all of the objects that are prototyped after the car object  – even those that were created prior to this addition.**

```javascript
myCar.drive(20);
// Object { model="civic", mileage=20, make="Honda", more...}
```

### 5.7 Creating Objects with Constructors
- We can also create and initialize an object with the **new** keyword
  - The **new** keyword must be followed by a function invocation.
  - A function used in this way is called a **constructor**.

```javascript
var herAccount = new Object();
herAccount.name = "Alice";
herAccount.balance = 300;
```

*We can also define our own constructor functions to initialize newly created objects.*

```javascript
// The following example defines a constructor function to create a Car object and initialize it with the given property, make:

function Car(make) {
  this.make= make;
}

Car.prototype.drive = function (distance ) {   // define a drive method for the prototype
  this.mileage = this.mileage + distance;
}
```

**Once we have defined the Car constructor, we can create new objects with the new keyword as follows:**

```javascript 
var myCar = new Car("Honda");
var yourCar = new Car("Porsche");
myCar.drive(10);
console.log(myCar);
// >>> 10
```

**Note that myCar and yourCar are 2 different objects.  They have different values for their make property.  They have the same prototype and they both inherited mileage and drive from it.**

### 5.8 Properties and Inheritance
- With inheritance, things are a little more complicated as to which properties we are really accessing.
- Each object has its own direct properties and it also inherits properties from the prototype object.  You can use the hasOwnProperty() method on any object to distinguish between direct (own) and inherited properties.

```javascript
var car = {mileage: 0};   
var hondaCar = Object.create(car);
hondaCar.make = 'Honda';
var myCar = Object.create(hondaCar);
myCar.model = 'civic';

myCar.hasOwnProperty('mileage');
// false
car.hasOwnProperty('mileage');
// true
myCar.color;
// undefined
```


*In general, if the object does not have a direct property, JavaScript looks for the property in the prototype.  If the prototype object does not have a direct property by that name either but has a prototype itself, then JavaScript looks for that property in the prototype of the prototype. This continues until the property is found or until an object with a null prototype is searched.*

This mechanism allows us to **selectively override inherited properties**.

### 5.9 Prototype vs Class

**JavaScript is an object-based language based on prototypes, rather than class.**

All objects are instances and you construct an object hierarchy by assigning another object as its prototype.

Instead of inheriting properties by following the class chain, JavaScript objects inherit properties by following the prototype chain.

**The prototype specifies an initial set of properties. We can add or remove properties dynamically to individual objects or to the prototype thus affecting an entire set of objects.** When we add a new property to a prototype, that property is immediately visible in all of the objects that are based on that prototype – even those that were created prior to this addition.

## Properties

### 6.1 Configurable Properties in ECMAScript 5

In EcmaScript 5, properties have attributes that specify whether they can be written, enumerated, or configured.  These attributes may be set or reset with the **Object.defineProperty()** method. 

example:
```javascript
Object.defineProperty(myCar, 'year',  { value : 2009, writable: false, enumerable: true, configurable: false});
```
- The value of year is set to 2009. 
- However that property is **NOT writable**, which means that we cannot change it with an assignment statement. 
- It is **enumerable**, which means it shows up during enumeration of the properties on the corresponding object. 
- It is **NOT configurable**, which means its attributes cannot be changed with another call to defineProperty, and it cannot be deleted.

### 6.2 Deleting Properties

To remove a configurable property from an object, we can use the delete operator.  Delete will return true if the property is deleted successfully.
```javascript 
delete myCar.model;
```
In strict mode, attempting to delete a nonconfigurable property results in an exception. In non-strict mode, delete simply returns false in this case.

### 6.3. Testing Properties
use the **in** method
 It returns true if the object has a direct or inherited property with a given name.
 
```JavaScript
"mileage" in myCar;
```

We have also already seen how to use the hasOwnProperty() method to distinguish between direct (own) and inherited properties.
The propertyIsEnumerable() is even more specific. It returns true only if the named property is a direct property and it is enumerable.

### 6.4 Iterating Over Properties
The for...in loop allows us to iterate **over the enumerable properties** of an object.

```JavaScript
var car = {mileage: 0};  
var hondaCar = Object.create(car);
hondaCar.make = 'Honda';
var myCar = Object.create(hondaCar);
myCar.model = 'civic';
Object.defineProperty(myCar, 'year',  { value : 2009, writable: false, enumerable: true, configurable: false});
Object.defineProperty(myCar, 'vin', { value: 123456789, writable: false, enumerable: false, configurable: false});
var carDescription = "";
for (var prop in myCar) {
  // add the string property name: property value followed by a new line        
  carDescription += prop + ": " + myCar[prop] + "\n"; 
}
console.log(carDescription);
// model: civic
// year: 2009
// make: Honda
// mileage: 0
```



