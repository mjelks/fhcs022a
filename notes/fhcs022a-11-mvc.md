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

#### Web applications on the server side are usually structured in three tiers. 

1. Presentation Tier
    - Web Server
2. Logic Tier
    - Middleware
    - Application
3. Persistence Tier
    - Database
    
- The presentation tier usually consists of an HTTP server which listens on an HTTP port and accepts requests from the outside world.
- The HTTP server forwards requests to the **logic (or application) tier**.  The logic tier contains our actual application code
- The application server handles the details of HTTP requests for our logic tier and allows us to **define a high level routing to be associated with each request**
- The **Persistence tier** is usually implemented using a database management system such as MySQL

#### The three tiers may actually reside on different computers. It’s even common for each tier to span several computers.

##### It's important to note that the lines between the three tiers are sometimes blurred

### 20.2. The Web Stack

#### When we develop a web application, we are faced with choices at all levels.

- What web server do we use?  Some servers (such as the one we implemented in node) support event driven, asynchronous handling of requests.  Others such as Apache web servers create a new process for each request.
- What framework/programming language is best suited for our application (on the server side)? 
- What about the persistence tier?   

#### We commonly refer to a combination of choices as a web stack.

### 20.3. Scalability

#### One approach for building scalability into web applications is to allow each tier to span several computers. 

#### In this case we have several web servers handling http requests and routing them to one of several application servers.  We can then add computers to each tier to match the growing demand.  This is known as horizontal scaling.

#### For this approach to work it is important that a component does not need to share anything with its counterpart on a different computer so there is no bottleneck involved around that shared resource.  This is referred to as the shared-nothing architecture.

- Scaling becomes more challenging when we get to the persistence tier.  The shared nothing approach does not apply to databases that receive updates.  Techniques such as database replication or sharding are used to alleviate bottlenecks in the persistence tier.
- When the database is read much more frequently than it is written, several copies of the database are kept on different computers.  The copies are referred to as slaves.  The original is the master. Any slave can perform reads, only the master can perform writes, and the master updates the slaves as quickly as possible.
- Another approach is sharding.  The database is split horizontally (by rows) and the smaller parts reside on different computers.  The split may be along geographical location or any other criteria.

## 21 : Testing

### 21.1. What do we test?

#### Functional Testing:
- Does our application do what it is supposed to do?  Does it behave correctly?  Does it produce the expected outcome?

#### Usability Testing:
- Is our application easy to navigate?  Is it obvious to the user which actions are available?  Does the user interface match the target audience’s needs?

#### Compatibility Testing
- Does our application run on all browsers, or on all ‘modern’ browsers, or on a subset thereof?
- Does it run on all devices including phones and tablets or is the functionality dependent on the device?

#### Security Testing:
- Does our application protect the user’s information?  Is it vulnerable to any kind of hackers’ attacks?

#### Performance Testing:
- What response time does the user experience under normal conditions?  Are there any bottlenecks in our application that we need to address?  We’ll look more closely at performance issues in web applications in an upcoming section.

#### Load Testing:
- Does our application perform well regardless of how many users it is serving?  Remember the issues surrounding the launch of the health care web site healthcare.gov

### 21.2. Selenium

#### Selenium is a browser automation tool that is commonly used for automating the testing of web applications.  It includes two major components:  Selenium IDE and Selenium WebDriver.

### 21.3. Performance Tuning and Latency

Several metrics may be used to assess the performance of a web application.

Latency is defined as the time between making a request and beginning to see a result.   It may also be defined as the time between making a request and the completion of the response.

In both cases we are concerned about the response time that the user sitting in front of the browser, experiences.  How long does it take to load the web page?

#### Response time is determined by the following components:
- How long does it take to generate the web page (on the server)?
- How long does it take for the browser to parse it?
- How long does it take to download all the components (scripts, stylesheets, images)?
- How long does it take for the browser to render it?

### 21.4. Load Testing and Throughput	

#### Load testing is primarily focused on back end performance. Its objective is to determine the maximum throughput that a web application can sustain.  Throughput is defined as the number of requests (or transactions) that an application can handle per unit of time.

## 22 : Mobile Platforms

### 22.1. Web Applications vs Native Applications

- On mobile platforms, users have access to two main categories of applications.
    - **Native applications** live on the mobile device and are installed through an app store. They are **developed specifically for one platform**, and can take advantage of the device features.
    - **Web applications are available through a browser**. Users first access them through a web address and then have the option to install them on the home screen.

### 22.2. Special Considerations

- The small screen size represents some usability challenges.
    - web applications can offer a scaled-down version optimized for small screens. This can be achieved through the use of CSS3 media queries and other Responsive Web Design (RWD) techniques (sizing images in relative units, etc.)  With these techniques, we can use the same code to present content at its best on the device on which it is being viewed.

- The data connection speed will usually be slower on mobile devices.
    - **minimize the amount of data that the user has to download**
    
- The use of the **application cache** becomes essential when dealing with mobile devices.    

- 'minify' JavaScript code as well as style sheets