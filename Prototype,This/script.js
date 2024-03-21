// 'use strict';
//Ways of creating an object

//literal

// const user1 = {
//     name: 'Hari',
//     age: 23
// }

// //generator function

// function createUser(name, age) {
//     return {
//         name: name,
//         age: age
//     }
// }

// const user2 = createUser('Hari',23);


// //Class

// class User1 {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }

// const user4 = new User1('Hari',23);

//Constructor
// function User(name, age) {
//     //const this = Object.create(User.prototype); handled by new keyword
//     this.name = name;
//     this.age = age;
//     // return this;
// }

// const user3 = new User('Hari',23);

//In JS, all functions have a property called prototype. 
//We can acces that and add prototypes for constructors

// console.log(User.prototype)

//add methods and properties to its prototype for objects to inherit from it.

// User.prototype.salary=200;
// User.prototype.getName=function(){return this.name};

// console.log(user3.salary) // can get 200 


//new keyword does the following:
//creates a new object, intantiates its prototype as the constructor function's Prototype, 
//sets this to point to the newly created object,
// sets properties through the constructor and 
// returns the created object if non-primitive value is not being returned.

//Setting prototype


// const personPrototype ={
//     greet(){
//         console.log('Hello my name is ', this.name);
//     }
// }

//using Object.create

// const person1 = Object.create(personPrototype)

// person1.name = 'John'

// person1.greet()

// //using Object.assign

// function Person(){
//     this.name = 'Hari';
// }

// Object.assign(Person.prototype,personPrototype);

// const person2 = new Person();
// person2.greet()

// We can access prototype of an object with the __proto__ property but it is not recommended.
//instead we can these
// Object.setPrototypeOf()
// Object.getPrototypeOf()

// The difference between `__proto__` and `prototype` is simple: `__proto__` is a property of an object instance, 
// while `prototype` is a property of a constructor function.
// When you use `__proto__`, you're looking up properties and methods on an object's prototype chain. 
// On the other hand, `prototype` defines the shared properties and methods that all instances created from a constructor function will have.

// const Vehicle = function(type){
//     this.type = type;
// }

// Vehicle.prototype.blowhorn = function(){ // All vehicle can blow horn
//     console.log('honk honk');
// }

// function Bus (make){
//     Vehicle.call(this, 'Bus'); // calls the vehicle constructor for bus, so that it can set type of it
//    this.make = make;
// }

// Bus.prototype = Object.create(Vehicle.prototype); // assigns the prototype for inheriting from vehicle
// const b1 = new Bus('Benz')
// Bus.prototype.noOfWheels = 6; // all buses will have 6 wheels
// Bus.prototype.accelerator = function() { console.log('Accelerating Bus')}; //Bus accelerator
// Bus.prototype.brake = function() { console.log('Braking Bus')}

// function Car(make){
//     Vehicle.call(this, 'Car'); // calls the vehicle constructor for car, so that it can set type of it
//    this.make = make;
// }

// Car.prototype = Object.create(Vehicle.prototype); // assigns the prototype for inheriting from vehicle

// const c1 = new Car('Toyota')
// Car.prototype.noOfWheels=4;
// console.log(c1.__proto__)
// console.log(b1)

// function outer(){
//  function inner(){
//         console.log(this); // window in non strict, undefined in strict
//     }
//     inner();
// }
// outer();