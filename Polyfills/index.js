const arr = [1, 2, 3, 4, 5];

//----------------------For Each------------------------------------------
// arr.forEach((val)=>console.log(val));

//Polyfill for foreach

// Array.prototype.myForEach= function(cb){
//     for(let i=0;i<this.length;i++){
//         cb(this[i],i,this);
//     }
// }

// arr.myForEach((val,i)=>console.log(val));

//---------------------------Map------------------------------------------

// console.log(arr.map((val) => val * 2));

// //Polyfill for map

// Array.prototype.myMap = function (cb){
//   let a = [];
//   for (let i = 0; i < this.length; i++) {
//     a.push(cb(this[i], i, this));
//   }
//   return a;
// };
// console.log(arr.myMap((val) => val * 2));

//----------------------------Filter-------------------------------------

// console.log(arr.filter(val=>val%2==0));

// Array.prototype.myFilter = function(cb){
//       let a = [];
//   for (let i = 0; i < this.length; i++) {
//     if(cb(this[i],i,this)) a.push(this[i]);
//   }
//   return a;
// };
// console.log(arr.myFilter(val=>val%2==0));

//--------------------------Reduce--------------------------------------

// console.log(arr.reduce((acc,curr)=>acc+curr,0));

// Array.prototype.myReduce = function(cb,initialvalue){
//     if(!initialvalue && !this.length) throw new TypeError('No element to accumulate,initial value required');
//     let acc = initialvalue;
//     for(let i = 0; i < this.length; i++){
//         acc = acc?cb(acc,this[i],i,this): this[i]; 
//     }
//     return acc;
// }
// console.log(arr.myReduce((acc,curr)=>acc+curr,0));
// console.log([].myReduce((acc,curr)=>acc+curr)); //TypeError