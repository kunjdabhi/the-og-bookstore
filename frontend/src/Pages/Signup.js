import React, { useState } from 'react'
import { useRef } from 'react';
import { useSignup } from '../Hooks/useSignup';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [user, setUser] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {signup,error,loading} = useSignup();

    let signupFlag = false;
    const handleSignup = async (e)=>{   
        e.preventDefault();
        await signup({email:user.email, firstname:user.firstname, lastname:user.lastname, password:user.password, mobile:user.mobile});
        signupFlag = true;
        if(!error){
          navigate('/');
        }
    }

    const changeHandler = (e)=>{
      setUser((user) =>{
        return {...user, [e.target.name]:e.target.value}
      })
    }
  return (
    <form onSubmit={handleSignup}>
        <div className='absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col p-5 w-[50%]'>
            <h1 className='text-[#384749] text-center text-2xl mb-8 font-bold'>Signup</h1>

          <div className='flex flex-col items-center'>
            <input type='email' placeholder='Email' className='mb-4 w-[50%]  py-2 rounded-sm pl-1 outline-none' required={true} name='email' onChange={changeHandler}/>

            <input type='text' placeholder='First Name' className='mb-4 w-[50%] py-2 rounded-sm pl-1 outline-none' required={true} name='firstname' onChange={changeHandler}/>
            <input type='text' placeholder='Last Name' className='mb-4 w-[50%] py-2 rounded-sm pl-1 outline-none' required={true} name='lastname' onChange={changeHandler}/>
            <input type='text' placeholder='Mobile No.' className='mb-4 w-[50%] py-2 rounded-sm pl-1 outline-none' required={true} name='mobile' onChange={changeHandler}/>

            <input type='password'placeholder='Password' className='mb-4 w-[50%] py-2 rounded-sm pl-1 outline-none' required={true} name='password' onChange={changeHandler}/>
            <input type='text'placeholder='Confirm Password' className='mb-4 w-[50%] py-2 rounded-sm pl-1 mb-9 outline-none' name='cnfPassword' required={true} onChange={changeHandler}/>

            <button type='submit' className="px-1 py-1 rounded-md text-[#F0EBE3] bg-[#576F72] py-2 w-[50%]">Signup</button>
            {error && <div className='text-red-800 mt-3 bg-red-300 p-3 rounded-md '>{error}</div>}
            {signupFlag && <div className='text-red-800 mt-3 bg-red-300 p-3 rounded-md '>Signup succesfull</div>}
          </div>
        </div>
    </form>
  ) 
}

export default Signup