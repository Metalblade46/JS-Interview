/*
Coercion in JavaScript is the process of automatically converting a value from one data type to another. 
This can happen implicitly or explicitly.
Implicit coercion happens when JavaScript automatically converts a value to a different type in order to perform an operation. 
For example, if you add a string and a number, JavaScript will automatically convert the string to a number before performing the addition.
Explicit coercion happens when you use a function to convert a value to a different type. For example, you can use 
the Number() function to convert a string to a number.


// Type conversion examples
//Most of the time, operators and functions automatically convert the values given to them to the right type.

//For example, alert automatically converts any value to a string to show it. Mathematical operations convert values to numbers.

//String conversions
// let value= true;
// alert(typeof value);//implicit conversion
// alert(String(value));// explicit conversion

//Number conversions

// alert('6'/'2') //3 implicit conversion

// let str = '123'

// alert(typeof str)

// let num = Number(str) // explicit conversion

// alert(typeof num)

// let str = 'An arbitary String';
// let num = Number(str) 
// alert(num) // NaN, as conversion faled, 
/*

Rules for numeric conversion
Value	    Becomes…
undefined	NaN
null	    0
true and false	1 and 0
string	   Whitespaces (includes spaces, tabs \t, newlines \n etc.) from the start and end are removed. If the remaining string is empty, the result is 0. Otherwise, the number is “read” from the string. An error gives NaN.
*/

// alert(Number(' 123 ')) //123

// alert(Number(' 123z ')) //123

// alert(Number(true)) //1

// alert(Number(false)) //0

// Boolean Conversions
//0, null, undefined, NaN, ""	become false rest become true

// alert(Boolean(' false ')) //true
// alert(Boolean(1)) //true
// alert(Boolean(0)) //false
// alert(Boolean('')) //false

// alert(Boolean(null)) //false

// alert(Boolean(undefined)) //false

// alert(Boolean(NaN)) //false

// alert(Boolean(Infinity)) //true
// alert(Boolean(' ')) //true anything but empty string is true
// alert(Boolean('0')) //true anything but empty string is true

//Object Conversions
//Numeric operations can't be done on objects except date objects

//Rules
//There’s no conversion to boolean. All objects are true in a boolean context, as simple as that. There exist only numeric and string conversions.
// The numeric conversion happens when we subtract objects or apply mathematical functions
// As for the string conversion – it usually happens when we output an object with alert(obj) and in similar contexts.

//There are three variants of type conversion, that happen in various situations. They’re called “hints”

// obj ={
//     name: 'Vipul'
// }
//string

// alert(obj) //[object Object]

// //using object as key(expects string)
// // anotherObj[obj] =123

//number

//explicit
// let num = Number(obj)
// console.log(num) //NaN

//maths (except binary plus)
//  let n = +obj // unary plus
//  let delta = date1- date2 //date subtraction
//  let graeter = obj1>obj2 // comparision

//default
//Occurs in rare cases when the operator is “not sure” what type to expect.

// For instance, binary plus + can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the "default" hint to convert it.

// Also, if an object is compared using == with a string, number or a symbol, it’s also unclear which conversion should be done, so the "default" hint is used.

// binary plus uses the "default" hint
// let total = obj1 + obj2;

// obj == number uses the "default" hint
// if (user == 1) { ... };

//The greater and less comparison operators, such as < >, can work with both strings and numbers too. Still, they use the "number" hint, not "default". That’s for historical reasons.

/*
To do the conversion, JavaScript tries to find and call three object methods:

Call obj[Symbol.toPrimitive](hint) – the method with the symbolic key Symbol.toPrimitive (system symbol), if such method exists,
Otherwise if hint is "string"
try calling obj.toString() or obj.valueOf(), whatever exists.
Otherwise if hint is "number" or "default"
try calling obj.valueOf() or obj.toString(), whatever exists.
*/

// let user = {
//     name: 'Sabby',
//     money: 1000,
//     [Symbol.toPrimitive](hint){
//         alert(`hint: ${hint}`)
//         return hint=='string' ? `name: ${this.name}`: this.money; 
//     }
// }
// Demo
// alert(user)// string , Sabby
// alert(+user)// number, 1000
// alert(user+500) //default, 1500

//If [Symbol.toPrimitive] is not available, JS tries to find toString / valueOf methods

//toString is called for 'string' hint whereas valueOf for other hints  
// If toString or valueOf returns an object, then it’s ignored (same as if there were no method).

// let user = {
//     name: 'Sabby',
// }
// alert(user) // hint string, toString returns [object Object]
// alert(user.valueOf()) // ignored as it retuns non primitive [object Object]

// alert(user.valueOf()===user) // true so valueOf returns the user object proved


//Implementation

// let user = {
//     name: 'Sabby',
//     money: 1000,
//     toString: function(){
//         return this.name
//     },
//     // valueOf(){
//     //     return this.money
//     // }
// }
// alert(user) //name: Sabby
// alert(+user)// 1000 valueOf called for number hint
// alert(500+user)//1500 valueOf called for default hint

//Often we want a single “catch-all” place to handle all primitive conversions. In this case, we can implement toString only.

//Another scenario

let obj = {
    // toString(){
    //     return '4';
    // },
    valueOf(){
        return 6;
    }
}


//Coersion chain 
//[Symbol.toPrototype](hint) |
//Case: hint==string  -> toString -> __proto__.toString-> Object.prototype.toString , prints [object Object]
//Case: hint==number||default -> valueOf-> toString -> Object.prototype.valeOf

// alert(obj)
// alert(+obj) //4 
// alert(obj+2) //8 as it gets the valueoOf for number hint but if valueOf is not defined, it can take the string and return 42
// alert(obj*2) // 8 as it obj is first converted to string and then number 

// var f = {
//     valueOf: function() {
//       return "abc";
//     }
//   }
  
//   alert(f) // toString of object -> [object Object]
//   alert(+f) // valueOf-> NAN 

//function coercion

// let fun =()=> {
//     console.log(2);
// }
//  fun.valueOf = ()=> 2;

// //  alert(fun) //function toString prints the function body, works for arrow functions the same
// //  alert(+fun) // valueOf->2 as functions are objects
// //  alert(fun+10)// valueof-> 12
//  alert(fun()+10) //'undefined'+10 = NaN