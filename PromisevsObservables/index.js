const {Observable} = rxjs // to import

//----------------------------1. Eager Vs lazy execution------------------------------------

/*eagerly executed: Promises are executed immediately when the constructor is called.
lazily executed: Observables are executed only when they are subscribed.
*/

// const promise = new Promise((resolve, reject) =>{
//     console.log(' Promise done');
//     setTimeout(()=>{
//         resolve('yep Promise!')
//     },2000)
// })

// setTimeout(()=>{
//     promise.then(result=>{
//         console.log(result);
//     })
// },2000)

/*
Here, in case of promise, we see that promise is eager loading, even before this promise is used anywhere, the promise gets run and we see the log.
By the time we call the then block, the promise is already resolved. So, total time taken is 2 seconds.
*/


// const obs = new Observable(observer=>{
   
//     setTimeout(()=>{
//         observer.next('yep Observable!');
//         // observer.complete();
//     },2000)
//     console.log('Ovservable invoked');
// });

// // obs.subscribe(console.log); //if I dont subcribe, even the console log, wont be executed, thus, lazy loading

// setTimeout(() => {
//     obs.subscribe(console.log); // This will display invoked after 2 seconds
// }, 2000);

/*
 Here, in case of observable, we see that observable is lazy loading, It doesn't execute the code inside if no one is subscribed. 
 Once subscribed, the code is run 
*/


//----------------------------2. Observable subscriptions are cancellable ------------------------------------
/*
The promise gets started as soon as the constructor is called and once it is started, it can not be stopped. 
Whereas observables can emit multiple values and you can stop listening to those emitted values by unsubscribing them.
*/

//------------------Example with Network requests--------------------------------

// function http(consumer, isPromise=false){
//     const http = new XMLHttpRequest();
//     const URL = 'https://jsonplaceholder.typicode.com/todos/1';
//     const onload = function(){
//         if(http.status === 200 && http.readyState==4){
//             if(isPromise){
//                 return consumer(http.response);
//             }else{
//                 return consumer.next(http.response);
//             }
//         }
//     }
//     http.onload=onload;
//     http.open('GET', URL);
//     http.send();

//     return ()=>{ // we can define a return function which the observable uses for unsubscribing
//         http.onload=null;
//         http.abort();
//     }
// }

// const promise = new Promise(resolve => http(resolve,true)) // will be called even if no one is using it.

// promise.then(console.log)

// const observable = new Observable(observer=>http(observer)) // only runs when anyone is subscribed

// const sub = observable.subscribe(console.log)
// sub.unsubscribe() // observable subscriptions can be unsubscribed, so the network requests will need to be stopped, promises can't be done like this

// setTimeout(() => {
//     observable.subscribe(console.log) // we can again subscribe to the observable and make the request
// }, 2000);



//----------------------------3. Single Vs multiple values------------------------------------

/*
Once a promise has been fulfilled, it will emit a single value. 
In contrast, an observable can emit multiple values, and if subscribed, the subscriber can receive all of the values emitted by the observer.
*/

// const pr = new Promise(res=>{
//     res('first');
//     res('second');
//     res('third');
// })

// pr.then(values=>{
//     console.log(values); // can resolve only 1 value, not streams
// })

// const obs = new Observable(observer=>{
//     observer.next('first');
//     observer.next('second');
//     observer.next('third');
//     observer.complete();// will keep on streaming data till completed
//     observer.next('fourth');//not displayed
// })

// obs.subscribe(values=>{
//     console.log(values); // can subscribe to multiple values
// })


//----------------------------4. Asynchronous Vs Synchronous------------------------------------

/*
Promises are always asynchronous. So even if the promise is resolved immediately, the task is put onto the microtask queue and will be 
executed only when the call stack is empty.Whereas observables can be synchronous or asynchronous depending on whether it is emitting 
the values synchronously or asynchronously.
*/

// const pr = new Promise(res=>{
//     res('Promise resolved');
// })
// console.log('Before Resolving')
// pr.then(console.log)
// console.log('After Resolving')

/*
Output:
Before Resolving
After Resolving
Promise resolved
*/

// const obs = new Observable(observer=>{
//     observer.next('Observer Completed');
// })

// console.log('Before Subscription')
// obs.subscribe(console.log)
// console.log('After Subscription')

/*
Synchronous code, so
Output:
Before Subscription
Observer Completed
After Subscription
*/

// const obs2 = new Observable(observer=>{
//     console.log('From Observer');
//     setTimeout(() => {
//         observer.next('First data');
//     }, 4000);
//     setTimeout(() => {
//         observer.next('Second data');
//     }, 2000);
//     setTimeout(() => {
//         observer.next('Third data');
//         observer.next('Fourth data');
//         observer.complete();
//     }, 5000);
// })

// console.log('Before Second Subscription')
// obs2.subscribe(console.log)
// console.log('After Second Subscription')

/*
Asynchronous code, so
Output:
Before Second Subscription
From Observer
After Second Subscription
Second data
First data
Third data
Fourth data
*/

//----------------------------Example of Memory Leak------------------------------------

const pr = new Promise(res=>{
    let counter =0;
    setInterval(() => {
        
    }, 1000);
})