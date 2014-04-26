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
