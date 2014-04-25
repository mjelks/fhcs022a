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

*use square bracket for dynamic keys*  
