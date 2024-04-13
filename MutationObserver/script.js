const mutationobserver = new MutationObserver((mutations) =>{
    console.log(mutations)
})

const parent = document.querySelector('.parent')
// mutationobserver.observe(parent, {
//     childList: true,
// })
// parent.children[0].remove()
// // parent.append(document.createElement('div')) //It displays all mutations done in the render. So 1 array with two records will be shown.


// setTimeout(()=>{
//     mutationobserver.disconnect()// stops observing
//     parent.append(document.createElement('div')) // will show different mutation record
// },2000)

//Observing for attribute mutations

// mutationobserver.observe(parent,{attributes: true, attributeOldValue: true,attributeFilter:['id']});  //we can choose to have the old value in the record, 
// //and also filter attributes

// parent.id= 'old id'
// parent.id= 'new id'

//Observing data changes


// mutationobserver.observe(parent.children[0].childNodes[0],{
//     characterData: true,
//     characterDataOldValue: true
// })

//for observing mutations in the child nodes as well, we can use subtree

mutationobserver.observe(parent,{
    subtree: true,
    characterData: true,
    characterDataOldValue: true
})