const intersectionObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        entry.target.classList.toggle('show',entry.isIntersecting)
        //we can also prevent backward animation like this
        // if (entry.isIntersecting) intersectionObserver.unobserve(entry.target)
    })
},{
    threshold: 0,
    // rootMargin:'100px', // sets the margin when the observer is triggered
    // root: element sets the parent container if it is scrolling
})
const cards = document.querySelectorAll('.card')

const lastcardObserver = new IntersectionObserver(entries=>{
    const lastCard = entries[0];
    if(!lastCard.isIntersecting) return;
    loadNewCards();
    lastcardObserver.unobserve(lastCard.target);
    lastcardObserver.observe(document.querySelector('.card:last-child'))
},{
    rootMargin:'100px'
})
lastcardObserver.observe(document.querySelector('.card:last-child'))
cards.forEach(card=>{
    intersectionObserver.observe(card)
})

function loadNewCards(){
    for(let i=0;i<10;i++){
        const card= document.createElement('div');
        card.classList.add('card');
        card.innerText='New Card'
        intersectionObserver.observe(card);
        document.querySelector('.container').append(card);
    }
}