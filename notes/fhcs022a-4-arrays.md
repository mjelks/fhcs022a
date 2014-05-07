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

