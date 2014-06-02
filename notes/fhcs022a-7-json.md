# Section 7 : JSON | Namespace Consideration | Libraries (jQuery)

## JSON

### 12.1 What is JSON

#### JSON is built on two structures:

- A collection of name/value pairs similar to a JavaScript object.
- An ordered list of values similar to a JavaScript array.

**JSON requires strings to be enclosed in double quotes.**  "Fido" is valid but 'Fido' is not.

**JSON also requires property names to be be enclosed in double quotes.**  (JavaScript does not).

```JavaScript
//  is valid JSON.
{ "name": "Fido", "hungry": false, "lonely": false, "unhealthy": false }
//  is NOT valid JSON.
{ name: "Fido", hungry: false, lonely: false, unhealthy: false }
```

### 12.2 Object Serialization

#### JSON.stringify()  may be used in ECMAScript 5 to serialize JavaScript objects and convert them to JSON format.

```JavaScript
>>> var myDog = { name: 'Fido', hungry: false, lonely: false, unhealthy: false };

>>> JSON.stringify( myDog );

"{"name":"Fido","hungry":false,"lonely":false,"unhealthy":false}"
```

#### JSON.stringify() takes an optional replacer argument that may be one of two things:

- a function that will replace values before converting to string.
- an array that contains the names of properties to be included in the output.  Note that the name 'replacer' is misleading in this case because the array is acting more like a filter rather than a replacer.

### 12.3 Parsing JSON

#### The function *JSON.parse()* may be used in *ECMAScript 5* to parse JSON formatted strings.

```JavaScript
var myString = '{"name":"Alice","phone":"555-1234"}'
JSON.parse(myString);
// Object { name="Alice", phone="555-1234"}
```

** JSON.parse() takes an optional reviver argument that will transform the parsed value before it is returned.**

```JavaScript
function standardize( propName, value) {

    // Standardize the country property

    if (propName === "country") {

        return "USA";

    };

  // Leave other properties unchanged

    return value;

};

var myString = '{"name":"Alice", "country":"United States", "phone":"555-1234"}';
JSON.parse(myString, standardize);
// Object { name="Alice", country="USA", phone="555-1234"}
```

### 12.4 Deep Copy with JSON

#### To make a deep copy of an array (or any object) in JavaScript, we can simply convert it to JSON format and then parse it back. 

```JavaScript
var charlie = [ 100, 98, [85,90], 85 ];
var diana=JSON.parse(JSON.stringify(charlie));
diana
// [100, 98, [85, 90], 85]
```

### 12.5 JSON vs XML

- XML is another plain text format used to structure, store, and transfer data.
- XML is based on a tree structure, and uses tags to delimit elements (like HTML).  However the tags are user-defined.  So for example to represent the information included in the JSON format:
    - Both JSON and XML use plain text and both formats are quite readable.  
    - Both support Unicode strings and that translates into support for any language.  
    - In addition, both use hierarchical structures.
    
**JSON results in shorter encodings for the same data**, mainly because it does not require any closing tags.  JSON also supports arrays.

## 13. Namespace Considerations

### 13.1. Global Variables and Functions as Properties

In a JavaScript program, when we declare a variable outside of any function, that variable becomes a property of the global object.  Named functions that we declare in our program are also properties of the global object.   In client side JavaScript that global object is window. 

### Object vs Namespace

One way to minimize the risk of name collision is to create a single global variable for our application: var  myApp = {};

The object referenced by that variable then becomes the container for our application.

Our global variables will then be defined as properties of myApp and our functions will be defined as methods of myApp.

```JavaScript
var myApp = {};

myApp.update = function () {

    // Get the two input numbers 
    var firstNumber = Number(document.getElementById('first').value);
    var secondNumber = Number(document.getElementById('second').value);
 
    // Then  compute the sum
    var myAnswer = firstNumber + secondNumber;
 
    // And write it in the 'answer' element
    document.getElementById('answer').textContent = myAnswer;
};

myApp.help = function () {
    // check that there is an answer currently displayed
    var currentAnswer = Number(document.getElementById('answer').textContent);
    if (currentAnswer) {
        document.getElementById('answer').textContent = 
            currentAnswer +
            '=' +
            document.getElementById('first').value +
            '+' + 
            document.getElementById('second').value;
    }
}; 
// example usage:
document.getElementById('first').addEventListener('input', myApp.update, false);
document.getElementById('second').addEventListener('input', myApp.update, false);
document.getElementById('answer').addEventListener('mouseover', myApp.help, false);
``` 

** OR ** 

```JavaScript
var myApp = {

    update: function ()  {

// Get the two input numbers

var firstNumber = Number(document.getElementById('first').value);

var secondNumber = Number(document.getElementById('second').value);

// Then  compute the sum

var myAnswer = firstNumber + secondNumber;

// And write it in the 'answer' element

document.getElementById('answer').textContent = myAnswer;

    },   

    help: function () {

// check that there is an answer currently displayed

var currentAnswer = Number(document.getElementById('answer').textContent);

if (currentAnswer) {

document.getElementById('answer').textContent =

currentAnswer +

'=' +

document.getElementById('first').value +

'+' +

document.getElementById('second').value;

}

};   

// example usage:
document.getElementById('first').addEventListener('input', myApp.update, false);
document.getElementById('second').addEventListener('input', myApp.update, false);
document.getElementById('answer').addEventListener('mouseover', myApp.help, false);
```

### 13.3 Function as Namespace 

#### Another approach to minimize the risk of name collision is to use a function as a container for all our code and then invoke that function.  The function is then just a temporary namespace for our code.

```JavaScript
function myModule(){

function update() {

    // Get the two input numbers 
    var firstNumber = Number(document.getElementById('first').value);
    var secondNumber = Number(document.getElementById('second').value);
 
    // Then  compute the sum
    var myAnswer = firstNumber + secondNumber;
 
    // And write it in the 'answer' element
    document.getElementById('answer').textContent = myAnswer;
};
 
function help() {
 
    // check that there is an answer currently displayed
    var currentAnswer = Number(document.getElementById('answer').textContent);
    if (currentAnswer) {
        document.getElementById('answer').textContent = 
            currentAnswer +
            '=' +
            document.getElementById('first').value +
            '+' + 
            document.getElementById('second').value;
    }
};
    
// Define our event listeners
document.getElementById('first').addEventListener('input', update, false);
document.getElementById('second').addEventListener('input', update, false);
document.getElementById('answer').addEventListener('mouseover', help, false);
}

myModule();
```

#### We have to make sure we call that function that we just declared.

**OR**

```JavaScript
// The only addition to the global namespace here is myModule.
// If we don't want to even add one name to the global namespace, we can define an anonymous function and invoke it as follows.  Note that for this to work, the whole thing has to be enclosed in parentheses.

(function(){

function update() {

    // Get the two input numbers 
    var firstNumber = Number(document.getElementById('first').value);
    var secondNumber = Number(document.getElementById('second').value);
 
    // Then  compute the sum
    var myAnswer = firstNumber + secondNumber;
 
    // And write it in the 'answer' element
    document.getElementById('answer').textContent = myAnswer;
};
 
function help() {
 
    // check that there is an answer currently displayed
    var currentAnswer = Number(document.getElementById('answer').textContent);
    if (currentAnswer) {
        document.getElementById('answer').textContent = 
            currentAnswer +
            '=' +
            document.getElementById('first').value +
            '+' + 
            document.getElementById('second').value;
    }
};
    
// Define our event listeners
document.getElementById('first').addEventListener('input', update, false);
document.getElementById('second').addEventListener('input', update, false);
document.getElementById('answer').addEventListener('mouseover', help, false);
}());
```

## Libraries & Frameworks

### 14.1 Overview

**YUI**
**Dojo**
**jQuery**