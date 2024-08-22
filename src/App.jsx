import  { useState ,useCallback, useEffect, useRef } from 'react'
import './App.css'

const App = () => {


  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //useRef hook
  const passwordRef=useRef(null);

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password);
  },[password])

  const PasswordGenrater=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="@#$%&*(){}[]";

    for(let i=1; i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass +=str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    PasswordGenrater();
  },[length,numberAllowed,charAllowed,PasswordGenrater])

  return (
    <>
      <h1 className='flex justify-center text-4xl m-5 text-white'>Password Genrator</h1>
      <div className='justify-center my-40 w-full max-w-lg mx-auto shadow-md rounded-lg px-7 py-5 text-orange-500 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden my-5'> 
           <input 
              type="text"
              className='outline-none w-full py-2 px-5' 
              placeholder='Password'
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button className='bg-red-500 hover:bg-red-800 px-3 text-cyan-300 rounded-sl' onClick={()=> copyPassword()}>copy</button>
        </div>
        <div className='flex text-sm gap-x-6 px-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer hover:bg-blue-900'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Lenght = {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            className='cursor-pointer hover:bg-blue-600'
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((pre)=>!pre);
            }}
            />
            <label>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            className='cursor-pointer'
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((pre)=>!pre);
            }}
            />
            <label>Charecter</label>
          </div>
        </div>
      </div>

      <h1 className=' flex align-bottom my-40 justify-center text-2xl text-white'>Devloped by Abhishekh Kumar Shakya</h1>
    </>
  )
}

export default App
