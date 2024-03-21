let stars = document.querySelectorAll('.star');
let container = document.querySelector('.container');
let hover=function(id){
    stars.forEach(st=>{
        if(st.id<=id){
            st.classList.add('hovered')
        }else{
            st.classList.remove('hovered')
        }
    })
}
let renderSelected = function(selectedRating){
    stars.forEach(st=>{
        if(st.id<=selectedRating){
            st.classList.add('selected')
        }else{
            st.classList.remove('selected')
        }
    })
}
renderSelected(0);
stars.forEach(st=>{
    st.addEventListener('mouseenter',(e)=>{
        hover(e.target.id);
    })
    st.addEventListener('click',(e)=>{
        renderSelected(e.target.id);
    })
})
container.addEventListener('mouseleave',()=>hover(0))
document.getElementById('clear').addEventListener('click',()=>renderSelected(0))