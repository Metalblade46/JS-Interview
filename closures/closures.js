
function outer(){
    let isCalled = false;
    return function inner(){
       if(!isCalled){
            isCalled = true;
           return 'Called';
       }else return undefined 
    }
}


const fun = outer();

console.log(fun());

console.log(fun());