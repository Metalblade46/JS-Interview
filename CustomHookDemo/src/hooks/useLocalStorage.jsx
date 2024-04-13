import { useEffect } from "react";
import { useState } from "react";

const getsavedvalue=(key,initialValue)=>{
    const savedvalue = JSON.parse(localStorage.getItem(key));
    if(savedvalue) 
    return savedvalue;
    if(Object.getPrototypeOf(initialValue)==Function.prototype) return initialValue();
    return initialValue;
}
export default function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(()=>getsavedvalue(key,initialValue))
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value])
    return [value, setValue]
}