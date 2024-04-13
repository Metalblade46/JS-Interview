//Promise is an object which represents eventual completion or rejection of an asynchronous operation.

//Scenario : Create an Order-> Proceed to payment -> Send Confirmation

//----------------------------Before Promises------------------------------------

// createOrder(()=>{
//     proceedToPayment((orderId)=>{
//         sendConfirmation(()=>{
//             console.log('All done!')
//         })
//     })
// })

// The above example uses callbacks to handle asynchronous operations. This had two problems:
//1. Callback Hell- The code grows horizontally making it complex and difficult to read. Also known as Pyramid of Doom.
//2. Inversion of Control - Passing callbacks to other functions means giving out our logic implementation to another function which may or may not
//execute our fuction as per expectation, so we lose control of the same.There was a trust issue.

//----------------------------After Promises------------------------------------

//Now createOrder, proceedToPayment and sendConfirmation all return promises.
// createOrder()
// .then((orderId)=>sendConfirmation())
// .then(()=>console.log('All done!'))

//Promises can have only 3 states, Pending, Fulfilled and Rejected.

//----------------------------Create Promise------------------------------------

// function createOrder(){
//     return new Promise((resolve,reject)=>{
//         if(true){
//             reject(new Error('Cart Invalid'))
//         }
//         setTimeout(()=>{
//             resolve(12345)
//         },5000)
//     })
// }

// function proceedToPayment(orderId){
//     return new Promise((resolve,reject)=>{
//         resolve('Payment Successful')
//     })
// }

// function sendConfirmation(){
//     return new Promise((resolve,reject)=>{
//         resolve('Confirmation Sent')
//     })
// }

// createOrder()  //This is promise chaining. We keep attaching the promises to then or catch blocks.
// .then((orderId)=>{
//     console.log(orderId)
//     return proceedToPayment(orderId) // we need to return the promise from one block to get its resolved data in the next then block
// })
// .then((paymentInfo)=>{
//     console.log(paymentInfo);
//     return sendConfirmation()
// })
// .then(confirmation=>console.log(confirmation))
// .catch(e=>console.log(e.message))// This is responsible for handling any error that happens before this
// .then(()=> console.log('I will be called even after catch'))
// .finally(()=>console.log('I will be called even after')) // always gets executed
// .then(()=>console.log('lolo'))// also gets executed

//----------------------------Promise.all------------------------------------

/*
The Promise.all() static method takes an iterable of promises as input and returns a single Promise. 
This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. 
It rejects when any of the input's promises rejects, with this first rejection reason.
*/

// let promise1 = 3;
// let promise2 = Promise.resolve(42); // The Promise.resolve() static method "resolves" a given value to a Promise. 
// //If the value is a promise, that promise is returned; if the value is a thenable, 
// //Promise.resolve() will call the then() method with two callbacks it prepared; otherwise the returned promise will be fulfilled with the value.

// let promise3 = new Promise(res=>setTimeout(res,100,'foo'));

// let promise4 = new Promise((res,rej)=>setTimeout(rej,4000,'Failed'))

// // Promise.all([promise1,promise2,promise3]).then(values=> console.log(values)) //[3, 42, 'foo']

// Promise.all([promise1,promise2,promise3,promise4]).then(values=> console.log(values)).catch(msg=>console.log(msg)) //Failed

//----------------------------Promise.allSettled------------------------------------

/*
The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. 
This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), 
with an array of objects that describe the outcome of each promise.
*/

// let promise1 = 3;
// let promise2 = Promise.resolve(42);
// let promise3 = new Promise((res,rej)=>setTimeout(rej,3000,'foo'));


// Promise.allSettled([promise1,promise2,promise3]).then(results=>{console.log(results); return results})// array of objects like {status: 'fulfilled', value: 3}

// .then(results=>{
//     results.forEach(result=>{
//         console.log(result.status,result.status=='fulfilled' ?result.value:result.reason) // fulfilled 3, fullfilled 42, rejected foo
//     })
// })

//----------------------------Promise.race------------------------------------
/*The Promise.race() static method takes an iterable of promises as input and returns a single Promise. 
This returned promise settles with the eventual state of the first promise that settles.
*/

// let promise1 = new Promise((res,rej)=>setTimeout(res,2000,'pass'));
// let promise2 = new Promise((res,rej)=>setTimeout(rej,3000,'fail'));
// let promise3 = new Promise((res,rej)=>setTimeout(rej,1000,'failed'));
// let promise4 = new Promise((res,rej)=>setTimeout(res,500,'passed'));

// Promise.race([promise1,promise2]).then(result=>console.log(result)) // pass
// Promise.race([promise1,promise2,promise3]).then(result=>console.log(result)) // uncaught 
// Promise.race([promise1,promise2,promise3]).then(result=>console.log(result)).catch(e=>console.log(e)) //failed
// Promise.race([promise1,promise2,promise3,promise4]).then(res=>console.log(res)) //passed

//---------------------------Promise.any-------------------------------------

/*
The Promise.any() static method takes an iterable of promises as input and returns a single Promise. 
This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. 
It rejects when all of the input's promises reject (including when an empty iterable is passed), with an 
AggregateError containing an array of rejection reasons.
*/

// let promise1 = new Promise((res,rej)=>setTimeout(rej,2000,'pass'));
// let promise2 = new Promise((res,rej)=>setTimeout(rej,3000,'fail'));
// let promise3 = new Promise((res,rej)=>setTimeout(rej,1000,'failed'));
// let promise4 = new Promise((res,rej)=>setTimeout(res,5000,'passed'));

// Promise.any([promise1,promise2,promise3]).then(result=>console.log(result)).catch(e=>console.log(e)) //AggregateError: All promises were rejected
// Promise.any([promise1,promise2,promise3,promise4]).then(result=>console.log(result)).catch(e=>console.log(e)) //passed
// Promise.any([]).catch(e=>console.log(e)) //AggregateError empty iterable also gets rejected
