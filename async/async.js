const posts = [
    { title: 'Post One', body: 'This is post 1'},
    { title: 'Post Two', body: 'This is post 2'}
]

let getPosts = () => {
    setTimeout(() => {
        let output='';
        posts.forEach(post => {
            output += `<li>${post.title}</li>`
        })
        document.getElementById('posts').innerHTML = output
    },5000)
}
let setPosts = (callback)=>{
    setTimeout(()=>{
        posts.push({ title: 'Post Three', body: 'This is post 3'});
        console.log('pushed')
        callback()
    },5000)
}

setPosts(getPosts)// takes 10 seconds
