# Section 5 : The Browser DOM

## The Document Object Model

### 9.1. What is the Document Object Model?

It is defined as a **platform and language independent interface** that allows programs to **access and update the content, structure and style of documents**.

**The DOM is a fully object-oriented representation of the web page**, and it can be accessed and modified with JavaScript.

The DOM API may be used for both HTML and XML documents.

### 9.2 From HTML Document to DOM Tree

A tree contains three different types of nodes:

1. At the root of the tree is the green **document node**: it represents the entire document.

2. **Element nodes** that represent HTML tags.

3. **Text nodes** they represent the content inside the tags.

### 9.3. Tree Terminology

The DOM tree is just like a family tree:  there are **parents, children, siblings**, ancestors and descendants.  The only difference is that every node except the root (the document) has **exactly one parent**.

### 9.4 Firebug + Firefox for DOM Tree Browsing

### 9.5. White space in the DOM

The different browsers deal with the white space (or new lines) inside the HTML source in an inconsistent manner.  That can **make the node traversal of the DOM tree unpredictable**.

- So to avoid ending up with extra text nodes we put our line breaks inside the tags, where white space is ignored.
- Another option is to use the **element traversal** interface where the text nodes are ignored.

### 9.6 Layout Engines and the DOM

The different browsers rely on layout engines to parse HTML into a DOM.  In general, layout engines are responsible for parsing the source HTML, generating the DOM representation and displaying the content.

The different layout engines implement the DOM standards to **varying degrees of compliance**.

### 9.7. Selecting Elements: where to start?

When we want to access objects in an HTML page, we start with the document object, window.document or simply document. 

The document object has two properties: documentElement and body.

document.documentElement gives us access to the top most <html> element.

document.body gives us access to the <body> element.

### 9.8. Selection by id

The recommended method is the simplest one: getElementById().

- The value of this attribute must be unique within the document — no two elements in the same document can have the same id. 
- case sensitive

### 9.9. Selection by type

We can select all elements of a specified type (or tag name) using the **getElementsByTagName()** method. This method is defined on the document object as well as on  individual elements.  

It returns an array like object containing all elements with a given tag, starting at the document level or at the specified element level.

```javascript
document.getElementsByTagName('p');

// another example:
var  bodyObj = document.body;
bodyObj.getElementsByTagName('*');
```

### 9.10. Selection by class name

We can select all elements of a specified class using the **getElementsByClassName()** method.  This method is  defined on the document object as well as on individual elements.  It returns an array like object containing all matching elements, starting at the document level or at the specified element level.

getElementsByClassName() takes one argument, but that argument may specify multiple class names separated by a space. Only elements that include all of the specified class names in their class attribute are matched. The order of the identifiers does not matter.

```javascript
document.getElementsByClassName('important');

// To get all elements with both the 'info' and 'important' classes:
document.getElementsByClassName('info important');

// We can chain the two method invocations above into one statement, replacing mainPar by its value:
document.getElementById('mainidea').getElementsByClassName('important');
```

### 9.11. Node Based Traversal

The node traversal interface was the original one.  It provides the following node object properties:

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

### 9.12. Element Based Traversal
We can use the following element properties for the element traversal:

- firstElementChild
- lastElementChild
- previousElementSibling
- nextElementSibling
- childElementCount

### 9.13. HTML Attributes and Element Properties

### 9.14. Element Content

How do we access and possibly modify what’s in these elements?  

- **innerHTML**
  - The innerHTML property returns the content of an element as a string of markup.  Basically it returns everything in between the opening and closing tags of that element, including tags of nested elements, if any.
  - The innerHTML property is writable, so we can use it to modify the element.
- **textContent**
  - The textContent property gives us access to the text content of the specified element, and all its descendants.  

### 9.15. User Input

- use the value function in form fields

```javascript
document.getElementById('first').value
// convert to number example
var firstNumber = Number(document.getElementById('first').value);
```