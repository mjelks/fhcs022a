# Section 4 : Arrays

## Arrays

### 7.1 Arrays: Elements and Indexes
#### An array is an **ordered** collection of elements.

##### Created using the array literal

```javascript
var myArray = ["Alice", 89, true, 500.2];
console.log(myArray[0]); // outputs "Alice"
``` 

#### can nest arrays

```javascript
var myArray = [86, 90, [100,85], 99];
console.log(myArray[2]); // [100,85]
console.log(myArray[2][0]); // 100
``` 

- **JavaScript arrays may be sparse**

```javascript
var myArray[0] = 1;
myArray[3] = 7;
[1,undefined, undefined, 7]
``` 

### 7.2 Array length

#### Arrays have a length property
    - for nonsparse arrays -- specifies number of Elements
    - sparse arrays -> length is one more than largest index
    
#### The length is not an upper bound.
- Making the length larger does **NOT** allocate more space for the array.  

#### Making the length smaller will truncate the array. 
- The elements with an index greater than or equal to the new length will be deleted

### 7.3 Rearranging an Array

#### Reverse

```javascript
var students= [ 'Alice', 'Charlie', 'Bob' ];
students.reverse();
students
[ "Bob", "Charlie", "Alice" ]
```

##### The array is reversed in place.  The elements are rearranged in the original array.

#### Sort

```javascript
students.sort();
students
[ "Alice", "Bob", "Charlie" ]
```

##### The array is sorted in place.  The elements are sorted in the original array.  The default sort is alphabetical, even if the elements are not strings.

#### Numeric Sort

- We can also use an anonymous function expression as the parameter to sort and write:

```javascript
myNumbers.sort(function (a, b) {
    if (a < b) {
        return - 1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
});
```

**OR**

```javascript
myNumbers.sort(function (a, b) {
    return a - b;
});
```

### 7.4 Splicing an Array

The splice method lets us perform complicated surgery on an array.  It can delete some elements and replace them with other elements in one step.

The first argument to splice is an index in the array. The second argument is the number of elements to remove.  The elements are removed from the given index on.  The removed elements are also returned by the method.  Any additional arguments get inserted into the array at that point:

```javascript
var colors = [ 'red', 'white', 'blue' ];
colors.splice(1, 1, 'green', 'yellow');
// start at index 1, remove 1 element and return it; insert ‘green’ and ‘yellow’.
["white"]
```

### 7.5 The Array as a Stack

#### The push(), pop(), shift() and unshift() methods allow us to use an array as a first in last out stack.

##### The push() method adds the given elements to the end of the array and returns the new length of the array.

```javascript
var colors = [ 'red', 'white', 'blue' ];
colors.push('green', 'yellow');
["red", "white", "blue", "green", "yellow"]
```

##### The pop() method removes the last element from an array and returns that element.

```javascript
colors.pop();
colors  // the original array is mutated
["red", "white", "blue", "green"]
```

---
**The unshift() and shift() methods are similar to push() and pop() but they operate on the beginning of the array instead of at its end.  As a result, they are usually slower than push() and pop().**

##### The unshift() method inserts one or more elements to the beginning of an array and returns the new length of the array.

```javascript
var colors = ['red', 'white', 'blue'];
colors.unshift('green', 'yellow');
colors
["green", "yellow", "red", "white", "blue"]
```

##### The shift() method removes the first element from an array and returns that element.

```javascript
colors.shift();
"green"
```

### 7.6 Iterating and Mapping

#### The forEach() method iterates over an array and executes a given function once for each element. 

```javascript
function showElement( value, index) {
    console.log (index + '--->' +  value);
}

var myArray = [ 'red', 'white', 'blue' ];
myArray.forEach(showElement);
0--->red
1--->white
2--->blue
```

- You can also use forEach() to modify the array you are invoking forEach() on.

```javascript
function extraPoints( value, index, array) {
    array[index] = value + 5;
}

var grades = [ 85, 94, 82, 90 ];
grades.forEach(extraPoints);   // add 5 to each element of the array
console.log(grades);    // the array is modified.
[ 90, 99, 87, 95 ]
```

- The **map()** method is similar to forEach() but it **returns a new array with the results of calling the given function on each element in this array**.  
    - The given function should have a return value.
    
```javascript
function square (number) {
    return number * number;
}

var myArray = [ 1, 2, 3, 4, 5 ];
var mySquares = myArray.map(square);
console.log(mySquares);
[ 1, 4, 9, 16, 25 ]
console.log(myArray);  // the original array is unchanged,
[ 1, 2, 3, 4, 5 ]
```    

*forEach() and map() were introduced in ECMAScript 5.*

### 7.7 Filtering and Testing

#### The filter() method creates a new array with all elements that pass the test implemented by the given function.

```javascript
function isA(grade) {
    if (grade >= 90) {
        return true;
    } else {
        return false;
    }
}

var classGrades = [ 60, 90, 87, 100, 86 ];
var aGrades = classGrades.filter(isA);

console.log(aGrades);  //aGrades will have the elements of classGrades that are >= 90.
[ 90, 100 ]
console.log(classGrades); // The original array is unchanged.
[ 60, 90, 87, 100, 86 ]
```

##### Can also use an anonymous func expression as argument to filter:

```javascript
var classGrades = [ 60, 90, 87, 100, 86 ];
var threshold = 90;

var aGrades = classGrades.filter(function (grade) {
    if (grade >= threshold) {
        // the anonymous function has access to the variable threshold
        return true;
    } else {
        return false;
    }
}
);

console.log(aGrades);
[ 90, 100 ]
```

#### The every() method tests whether all elements in the array pass the test implemented by the given function.

```javascript
classGrades.every(isA);
false

aGrades.every(isA);
true
```

#### The some() method tests whether some element in the array passes the test implemented by the given function.

```javascript
classGrades.some(isA);
true        
```

*The filter(), every() and some() methods were introduced in ECMAScript 5.*

### 7.8 Other Array built-ins

#### The join() method joins all elements of an array into a string and returns that string. You can specify a separator.  If you don’t, the default separator is a comma.  The original array is unchanged.

```javascript
var colors = [ 'red', 'white', 'blue' ];
colors.join();  // no separator is specified.  It will default to a comma.
"red,white,blue"

colors  // the original array is unchanged.
[ "red", "white", "blue" ]

colors.join(' and ');  // we specify ‘ and ‘ with extra spaces as the separator.
"red and white and blue"
```

#### The slice() method returns a shallow (one level deep) copy of a portion of an array from a given index position up to but not including a second index position.

```javascript
var myArray = [ 'zero', 'one', 'two', 'three' ];
myArray.slice(1, 3)
[ "one", "two" ]

// We get a copy of a portion of the array from a 1 up to but not including 3.
// The original array in unchanged.

myArray
[ "zero", "one", "two", "three" ]

//When the end index is not specified, the slice goes to the end of the array.
myArray.slice(1)
[ "one", "two", "three" ]

//When neither index is specified, we get a copy of the whole array.
myArray.slice()
[ "zero", "one", "two", "three" ]

//When we specify a negative index, we start counting from the end of the array.
myArray.slice(-3);
[ "one", "two", "three" ]
```

#### The concat() method returns  a new array containing a shallow copy of the array on which it  is invoked followed by each of the arguments to concat(). If an argument is an array, then each of its elements is concatenated individually.  
- If one or more of these elements is an array (nested array), then it is concatenated as an array. 

```javascript
var grades = [ 100, 86 ];
var homework = [ 95, 98 ];
var newGrades = grades.concat(homework, 90);

//Each of the elements of the array homework is concatenated individually.
[ 100, 86, 95, 98, 90 ]

grades;  // The original array is unchanged
[ 100, 86 ] 

// In the example below, the argument to concat() is an array, [ homework, 90 ] containing an array, homework: 
newGrades = grades.concat([ homework, 90 ]);
[ 100, 86, [95, 98], 90 ]
```

#### The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.  

#### The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present.
*These two methods were introduced in ECMAScript 5.*
