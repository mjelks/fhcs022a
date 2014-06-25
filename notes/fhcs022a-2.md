# Section 2 [ Control Structures && Functions ]
---

##   Control Structures 

###    3.1 : Conditional Statements

#### if / else if / else
    ternary operator => (check) ? true : false

#### Switch Statement
```javascript
    switch (expression ) {
      case value1:
        break;
      default:
        ajksdfj aksfjkaj  
    }
```

#### while loop
```javascript
    while (i < 10) {
      console.log("HEY");
      i++;
    }
```

#### increment/decrement operators
    ++ / -- -> make sure you understand post and pre increment on variables
    += | %= | /= | *=

#### do/while
```javascript
    // always executes at least once, even if statement is false
    do {
      console.log("HYE");
      i++;
    } while (i < 10)   
```  

#### for statement
```javascript
    for (var i=0; i<10; i++) {
      console.log("HEY");
    }
```    
  
##  Functions :  

### function declaration :
```javascript
  function hello(name) {
    name = name || 'Friend';  // use 'Friend' as the default
    console.log('Hello', name);
  }
```

#### functions w/out names are 'anonymous' functions

### argument logic ==> 

- if too many arguments, additional args are ignored
- if too few, the missing ones are set to 'undefined'
    
### return values : JavaScript always returns in methods
  
- if 'return' keyword not used, returned 'undefined'
  
### Recursion
```javascript
  function factorial(number) {
     if (number <= 1) {
         return 1;     
    } else {
         return factorial(number - 1) * number;  // a recursive call to factorial inside factorial
    }
  }
```
  
### function definition expressions 
```javascript
  var opposite = function (number) {
       return -number; 
  }
  opposite(10); ==> -10
```

- you can also pass in a function as a parameter:
  
### variable scope

- variables are available once they're declared (also see hoisting)
  - variables are locally scoped if declared inside methods
  - global scope if declared in body of script
    
- strict mode will throw exception if you assign a value to a variable that has yet to be declared
  - deleted when web page left/session destroyed
  
```javascript    
  someFunction ( function (parameters) { ...}) 
```
  
### hoisting

#### All variables declared within a function are visible throughout the body of the function. 

- It is as if all variable declarations in a function (but not the associated assignments) are "hoisted" (moved up) to the top of the function.
  
#### function declaration hoisting 

- functions are 'hoisted' to the top, so you can use them before they are declared.
  
#### function expressions ARE NOT hoisted
```javascript
  // this throws an exception :
  console.log(opposite(10));
  var opposite = function(number) {
       return -number;
  }
```  

### nested functions

- Functions may be nested within other functions.  
  
- outer function DOES NOT have access to inner function variables/functions
  
### closures

When functions are nested in JavaScript, the inner function has access to the scope of the outer function.  As a result, the variables defined in the outer function will live longer than the outer function itself, if the inner  function manages to survive beyond the life of the outer function.

A closure is created when the inner function is somehow made available to any scope outside the outer function.  

In practice, we can think of a closure as a function that remembers a state (without using a global variable.)
  
```javascript  
  function longest(word1, word2) {
    word1 = word1 || '';
    word2 = word2 || '';
    if (word1.length >= word2.length) {
        return (word1);
    } else {
        return (word2);
    }
  }
  
  function dashes(number) {
    var dashes = '';
    for (var i=0;i<number;i++) {
      dashes += '-';
    }
    // don't forget to return a string of dashes
    return dashes;
    
  }
  
  function getMax2(first, second) {
    var result = '';
    result = (first > second) ? first : second;
    return result;  
  }
  
  function getMax3(first, second, third) {
  
    var result = function getMax2(first, second) {
      return (first > second) ? first : second;
    }

  }
```


 