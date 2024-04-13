let obj1 = {
    firstName: 'Gopal',
    lastName: 'Bhar',
    printname(){
        console.log(this.firstName +' ' + this.lastName);
    }
}
let obj2 = {
    firstName: 'Ram',
    lastName: 'Nidhi',
}

// obj1.printname(); //Gopal Bhar
// obj2.printname();// not a function as it is not defined

//function borrowing, specifying this.

// obj1.printname.call(obj2); //Ram Nidhi

//Creating functions outside

function printName(hometown,state){
    console.log(this.firstName +' ' + this.lastName + ' from ' + hometown+', ' + state);
}

// printName.call(obj1,'Mumbai','Maharashtra'); // first argument is always replacement for this, later followed by other arguments

// printName.apply(obj2,['Kolkata','West Bengal']); // only difference between call and apply is the way arguments are passed

// //bind method, also used for substituting the this context, but doesn't invoke the function but returns a new context binded method

// let printObj2 = printName.bind(obj2,'Kolkata','West Bengal'); //arguments will also be bound
// printObj2(); //works just like the same

// VVI. Polyfill for bind method

    // let printNameObj = printName.bind(obj2,'Kolkata')
    // printNameObj('West Bengal'); 

// Function.prototype.myBind = function(...params){
//     let fn = this; // here the myBind is called for the function object, so this refers the function object
//     return function(...args){
//         fn.call(params[0],...params.slice(1),...args);
//     }
// }

// //we can also do this by moving the function inside the objects scope

Function.prototype.myBind2 = function(thisArg,...parameters){
    thisArg.func=this; //defining the function as the object's method, this is not a preferable way as it changes the object
    let f =  function(...args){
        thisArg.func(...parameters,...args)
    }
    return f;
}

// // let polyPrintNameObj = printName.myBind(obj2,'Kolkata')
// // polyPrintNameObj('West bengal')

let polyPrintNameObj = printName.myBind2(obj2,'Kolkata')
polyPrintNameObj('West bengal')
polyPrintNameObj('Mumbai')

//Polyfills for Call and Apply method

// Function.prototype.myCall = function(thisArg, ...args){
//     thisArg.fun = this;
//     let ans = thisArg.fun(...args);
//     delete thisArg.fun;
//     return ans;
// }
// Function.prototype.myApply = function(thisArg, args){
//     thisArg.fun = this;
//     let ans = thisArg.fun(...args);
//     delete thisArg.fun;
//     return ans;
// }

// printName.myCall(obj2,'Mumbai','Maharashtra') 
// printName.myApply(obj2,['Mumbai','Maharashtra']) 

console.log(obj2)