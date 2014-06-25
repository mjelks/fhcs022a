# Section 11 : MVC / Web App Design / Testing / Mobile Platforms
---

## 19 : The Model-View-Controller Design Pattern

### 19.1. Overview

- The model-view-controller (MVC) pattern is a software design pattern that is widely used in web application development.

- The model view-controller paradigm organizes an application into three components.
  - The **model** manages the **data** manipulated by the application.
  - The **view** deals with the specific **presentation** of the data to the user.
  - The **controller** contains the **logic** of the application.  It mediates the interaction with the model and the view.  

#### Each component has a well defined interface and interacts with the other components through that interface.

- The model component is accessible only through the controller.   The controller can send queries as well as updates to the model.
- The model deals with the data associated with the various businesses.
- The application may include several views
- The controller is responsible for handling the interaction with a user

### 19.2. Server Side or Client Side?

#### Nowadays, it is more common to see MVC components on the client side

##### Handling requests in the client side JavaScript 'controller' is easy and will result in a more responsive application.

##### Similarly we may have a model component on the client side to manage the data in local storage or session storage or even to get data from the server through ajax calls.

##### The view  component on the client side would be responsible for updating the web page through DOM manipulation.

### 19.3. Advantages

#### Here are some of the advantages of the model-view-controller paradigm:

1.   Complexity tamed:  instead of looking at the daunting task of implementing all aspects of the web application at once, we can focus on one component at a time.  

2.   Easier maintenance:  changes made to one component will not affect the others (as long as the interface is kept intact.)  Maintenance of the web application becomes easier.

3.   Reuse: a controller written for one web application may be reusable in a completely different application with different model and views.

4.   Testing: the three components can be tested independently.  Stubs and mocks may be used to emulate the functionality of the ‘other’ components.

5.   Specialization: the separation of the components allows different developers to work on the different aspects of the web application.  This is useful when developers have specialized skills.

6.   Parallel Development:  the three components can be developed in parallel by different teams.  

### 19.4. Example

```javascript
// MVC implementation of our simple calculator

// The controller consists of one function: update.

// It is invoked when the user types anything in the input fields

var controller = {   

    update: function () {

      // Get the input from the view

      var input = view.getInput();

      // Then  compute the sum

      var firstNumber = Number(input[0]) || 0;

      var secondNumber = Number(input[1]) || 0;                                     

      var myAnswer = firstNumber + secondNumber;                              

      // update the model

      model.save(firstNumber, secondNumber);       

      // update the view

      view.showResult(myAnswer);

    }   

};

// The model saves the data to local storage.

var model = {   

    save: function (first, second) {

        localStorage.setItem("firstNumber", first);

        localStorage.setItem("secondNumber", second);

    }

};  

 

// The view component has 2 functions: getInput and showResult

var view = {

    getInput: function () {

        var firstInput = document.getElementById("first").value ; 

        var secondInput = document.getElementById("second").value;

        return ([firstInput, secondInput]); // return an array with the 2 inputs  

    },

      

    showResult: function (result) {

        document.getElementById("answer").textContent = result;      

    }

}; 

 

// Event listeners

document.getElementById("first").addEventListener("input", controller.update, false);

document.getElementById("second").addEventListener("input", controller.update, false);
```

## 20 : Web Application Design Considerations

### 20.1. 3-Tier Architecture

### 20.2. The Web Stack

### 20.3. Scalability

## 21 : Testing

###21.1. What do we test?

###21.2. Selenium

###21.3. Performance Tuning and Latency

### 21.4. Load Testing and Throughput	

## 22 : Mobile Platforms

### 22.1. Web Applications vs Native Applications

### 22.2. Special Considerations
