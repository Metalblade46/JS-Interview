import { forwardRef, useRef, useState } from 'react'
import './App.css'
//useRef is a React Hook that lets you reference a value that’s not needed for rendering.
//Syntax: const inputRef = useRef(initialValue)
//Parameter- initialValue: The value you want the ref object’s current property to be initially. It can be a value of any type. 
//This argument is ignored after the initial render.
//Returns:  returns an object with a single property, current- Initially, it’s set to the initialValue you have passed. 
//You can later set it to something else. If you pass the ref object to React as a ref attribute to a JSX node, React will set its current property.
//On the next renders, useRef will return the same object.

//Some caveats:
/*
-You can mutate the ref.current property. Unlike state, it is mutable. 
However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn’t mutate that object.
-When you change the ref.current property, React does not re-render your component. 
React is not aware of when you change it because a ref is a plain JavaScript object.
-Do not write or read ref.current during rendering, except for initialization. This makes your component’s behavior unpredictable.
-In Strict Mode, React will call your component function twice in order to help you find accidental impurities. 
This is development-only behavior and does not affect production. Each ref object will be created twice, but one of the versions will be discarded. 
If your component function is pure (as it should be), this should not affect the behavior.
*/
//usage 1 : Referencing a value with a ref , Changing a ref does not trigger a re-render. 
//This means refs are perfect for storing information that doesn’t affect the visual output of your component.
// function App() {

// const [starttime, setStartTime] = useState(null);
// const [now,setnow] = useState(null);
// const intervalRef = useRef(null);

// function handleStart(){
//   setStartTime(Date.now());
//   setnow(Date.now());
//   clearInterval(intervalRef.current);
//   intervalRef.current = setInterval(()=>{
//     setnow(Date.now());
//   },10);
// }
// function handleStop(){
//   clearInterval(intervalRef.current);
// }

//   return (
//     <>
//  <h1>Time passed: {starttime==null&&now==null? Number(0).toFixed(3):((now-starttime)/1000).toFixed(3)}</h1>
//  <button onClick={handleStart}>Start</button>
//  <button onClick={handleStop}>Stop</button>
//     </>
//   )
// }

// usage 2: Dom Manipulation

// function App(){
//   const [isPlaying, setIsPlaying] = useState(false);
//   const ref= useRef(null);
//   const handleClick=()=>{
//     setIsPlaying(!isPlaying);
//     if(!isPlaying)ref.current.play();
//     else ref.current.pause();
//   }
//   return (
//     <div className='container'>
//       <button onClick={handleClick}>{isPlaying?'Pause':'Play'}</button>
//       <video ref={ref} width={250}  onPlay={()=>setIsPlaying(true)} onPause={()=>setIsPlaying(false)} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></video>
//     </div>
//   )
// }
//Usage 3: Exposing a ref to child component using forward ref

const MyInput = forwardRef((props,ref)=> <input {...props} ref={ref}/>)

function App() {
  const inputRef = useRef(null);
  function handleClick(){
    inputRef.current.focus();
  }
  return (
    <div className='container'>
      <MyInput ref={inputRef}/>
      <button onClick={handleClick}>Focus</button>
    </div>
  )
}
export default App
