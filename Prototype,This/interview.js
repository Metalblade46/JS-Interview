// const a = {
//     getName(){
//         return `I am ${this.name}`
//     }
// }
// console.log(a.__proto__===Object.prototype)// true, so default creation of objects, calls Object constructor and assigns its prototype to the object instance

// function Person(name){
//     this.name = name
// }

// // Person.prototype=a // every instance of Person can get access to a's methods, need to change before creating the object
// const b = new Person('Lalu');
// console.log(b.__proto__); // gives empty object containing the constructor which is the constructor function of the object
// console.log(b.__proto__.constructor===Person); //gives true
// console.log(b.constructor==Person); //true, goes up the chain and looks for constructor

// Object.setPrototypeOf(b,a); //we can set the prototype of a as b object

// Object.assign(Person.prototype,a)//assign the prototype

// Person.prototype=a // if changed here, b will still have the previous prototype with which it was created, any new person created will have a's properties

// const c = new Person('David')
// console.log(c.getName())// prints I am David

// console.log(b.__proto__); //gives a, so changing prototype makes the instance lose the consructor function
// console.log(b.getName()); //gives I am Lalu as it goes up the prototype chain


//-----------------------__proto__ and Prototype -----------------------------------------

//Each object has a __proto__ property which is an internal reference to the prototype object from which the instance object inherited. 
//The prototype object is special type of enumerable object to which additional properties can be attached to it which will be shared across 
//all the instances of its constructor function.

        // function Person(firstName, secondName){
        //     this.firstName = firstName;
        //     this.secondName = secondName;
        // }

        // Person.prototype.getFullName = function(){
        //     return `${this.firstName} ${this.secondName}`
        // }

        // let john = new Person('John', 'Doe')

        // console.log(john.__proto__); // internal reference to the prototype of constructor

        // console.log(Person.prototype===john.__proto__) //true

        // console.log(john.getFullName()); //John Doe


//-----------------------Setting Prototype -----------------------------------------

        // let animal={
        //     speaks:true
        // }

        // let dog={
        //     bark(){
        //         console.log('woof');
        //     }
        // }

        // console.log(dog.__proto__); //Object.prototype ,  it is not recommended to change protypes after creation, causes performance issues

        // console.log(dog.speaks); // undefined


        // Object.setPrototypeOf(dog,animal); // sets up the prototype chain, 


        // console.log(dog.speaks); // true, now accessible


//-----------------------Prototype Chain-----------------------------------------

//A prototype chain is a succession of links from one object's prototype to another, used when looking for a property or method.

        // let animal = {
        //     speaks: true,
        //     sound(){
        //         return 'Generic animal sound'
        //     }
        // }

        // const dog = Object.create(animal); //sets the prototype of dog as anial while creating the object

        // dog.bark = function(){
        //     console.log('woof');
        // }

        // console.log(dog.__proto__==animal); //true

        // console.log(dog.sound()); //Generic animal sound

        // console.log(dog.speaks); // true    

        // dog.bark(); // woof


//-----------------------Constructor Property -----------------------------------------

//The `constructor` property returns a reference to the `Object` constructor function that created the instance object. 
//Note that this property is derived from the object's prototype.

        // function Person(name, age){
        //     this.name = name;
        //     this.age = age;
        // }

        // let john = new Person('John','Doe')

        // console.log(john.constructor); // Person

        // //The constructor property is also useful when you want to create a new instance and you only have an instance of the object, but not the original constructor

        // let jane = new john.constructor('Jane', 'Di');

        // console.log(jane); // Person

//-------------Classical vs Prototypal inheritance--------------------------

// Prototypal Inheritance (JavaScript-style) and Classical Inheritance (like in Java or C++) are two different ways of dealing with object-oriented code. 
// JavaScript uses prototypal inheritance, but it can mimic classical inheritance with constructor functions and the `new` keyword.

//Classical (Simulation)------

        //Super Class Constructor (JavaScript-style)
        // function Animal(name){
        //     this.name = name;
        // }

        // Animal.prototype.speak = function(){
        //     return this.name + ' makes a sound'
        // }

        // //Subclass Constructor
        // function Dog(name){
        //     Animal.call(this, name);//calling parent's constructor
        // }

        // //Establish prototype chain to inherit methods

        // Dog.prototype = Object.create(Animal.prototype);
        // Dog.prototype.constructor=Dog; //repair the constructor which was removed, so as we can use instance.constructor() to create another instance

        // Dog.prototype.bark = function(){
        //     return this.name + ' barks'
        // }

        // var dog = new Dog('Rex');
        // console.log(dog.speak());// Rex makes a sound
        // console.log(dog.bark()); // Rex barks

//Prototypal------
       
        //Directly create an object linking its prototype to another object
        // let animal ={
        //     init(name){
        //         this.name = name
        //     },
        //     speak(){
        //         return this.name + ' makes a sound' 
        //     }
        // }

        // let dog = Object.create(animal);

        // dog.init('Rex')
        // dog.bark = function(){
        //     return this.name +' barks'
        // }

        // console.log(dog.speak());// Rex makes a sound

        // console.log(dog.bark()); // Rex barks


//-----------------------Pitfalls of Prototype-----------------------------------------
//Pitfalls include performance issues with changing prototypes, accidental sharing of properties, and confusion with this in prototype methods.


//All objects have a prototype assigned by JS engine till it reaches prototype of Object.prototype which is null

    // let fn = function(){

    // }
    // let arr =[]
    // let obj ={}

    // console.log(fn.__proto__==Function.prototype); //true
    // console.log(arr.__proto__==Array.prototype); //true
    // console.log(obj.__proto__==Object.prototype); //true

    // while(arr){
    //     console.log(arr.__proto__); //prints function/Array prototype, then object prototype, then null
    //     arr=arr.__proto__;
    // }

    //We can create an object without any prototype like this, it won't inherit anything

    // let nullObj = Object.create(null);

    // console.log(nullObj);//{}, no properties
    // console.log(nullObj.__proto__); //undefined


//-----------------------------Prototype Shadowing-----------------------------------

//Also known as method overriding, chain moves above while finding a property or method. So, whichever is found early is taken

    // const a ={
    //     speaks(){
    //         return 'a speaks'
    //     }
    // }

    // const b = Object.create(a);
    // b.speaks= function(){
    //     return 'b speaks'
    // }

    // const c = Object.create(b);

    // console.log(c.speaks()); //b speaks, b shadows a

//-----------------------------Removing Prototype Properties-----------------------------------

//We can emove properties from a prototype in JavaScript using the `delete` keyword, which can delete properties from any object. 
// However, we should be careful when doing this, as it can affect all objects that inherit from the prototype.

    // function Person(firstName, lastName){
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    // }
    // Person.prototype.getFullName= function(){
    //     return `${this.firstName} ${this.lastName}`
    // }

    // let john = new Person('John', 'Doe');

    // console.log(john.getFullName()) //John Doe

    // delete Person.prototype.getFullName

    // console.log(john.getFullName()) // not a function

//-----------------------------Arrow functions for Prototype-----------------------------------

// While you can technically use arrow functions as prototype methods in JavaScript, 
//it's generally not a good idea because arrow functions behave differently than traditional functions. 
//Specifically, arrow functions don't have their own `this` context, but instead inherit `this` from the surrounding (parent) scope at the time of definition.

// Person.prototype.getFullName = ()=>this.firstName + ' ' + this.lastName;

// let john = new Person('John', 'Doe');

// console.log(john.getFullName()) //undefined undefined, 
//In this case, the getFullName method is an arrow function, so this doesn't refer to the john object. 
//Instead, it refers to the surrounding scope, which in a non-strict global context is the window object (or global object in Node.js environment). 
//Since window.firstName and window.lastName are not defined, john.getFullName() returns "undefined undefined".
//For this reason, arrow functions are generally not used as object methods when those methods need to access other properties of the object.

//-----------------------------Prototype VS Instances-----------------------------------

//In JavaScript, an instance is an object that's created from a constructor function using the `new` keyword. 
//The prototype is an object that is used as a blueprint for creating new objects (instances).

    //Define Constructor
    // function Car(make, model){
    //     this.make = make;
    //     this.model = model;
    // }

    // //Create a prototype method
    // Car.prototype.displayCar = function(){
    //     return `${this.make} ${this.model}`
    // }

    // //Create an instance of the constructor

    // let myCar = new Car('Honda', 'Civic');

    // console.log(myCar.displayCar()); //Honda Civic

//Here, Car is constructor, displayCar is an added method to its prototype. 
//Every instance created from Car will have access to the constructor function and these properties and methods
//myCar is an instance created from the Car constructor function , so has access to props and methods of Car Prototype
//Main diifernece between instance and prototype is Changes to the prototype affect all instances, while changes to an instance only affect that instance.

//--------------------Native Prototypes------------------------

// "Native prototype" refers to the prototypes that are built into JavaScript itself, like `Array.prototype`, `Object.prototype`, `String.prototype`, etc

    //Define new method on native prototype
    // String.prototype.sayhello = function(){
    //     return 'Hello ' + this+'!'
    // }
    // console.log('World'.sayhello()) //Hello World!, modifying native prototypes in a real-world application is generally considered a bad practice.

    // delete String.prototype.trim

    // console.log('Hello World!   '.trim()) //trim is not a function

//We should only use a native prototype extension when you need to create a Polyfill for a method that exists in the JavaScript standard
// but is not yet supported by a particular JavaScript engine.

