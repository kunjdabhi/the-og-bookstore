import { useRef } from 'react';
import { useLogin } from '../Hooks/useLogin';
import {  useNavigate } from 'react-router-dom';


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login,error} = useLogin();
  const navigate = useNavigate();
  
  const handleLogin = async (e)=>{
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    
    await login(email,password);
    navigate('/');
      
  }
  const handleRegister = ()=>{
    navigate('/user/signup');
  }

  return (
    <form onSubmit={handleLogin}>
        <div className='absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col border-2 p-5 border-[#576F72] rounded-md'>
        <h1 className='text-[#384749] text-center text-xl mb-4 font-bold'>Login</h1>
            <label className='text-[#384749] font-bold text-lg mb-2' >Email</label>
            <input type='text' placeholder='enter your email' className='mb-4 w-64 py-2 rounded-lg pl-1 outline-none' ref={emailRef} />
            <label className='text-[#384749] font-bold text-lg mb-2'>Password</label>
            <input type='password'placeholder='enter the password' className='mb-4 w-64 py-2 rounded-lg pl-1 mb-9 outline-none' ref={passwordRef}/>
            <button className="px-1 py-1 rounded-md text-[#F0EBE3] bg-[#576F72] py-2">Login</button>
            {error && <div className='text-red-800 mt-3 bg-red-300 p-3 rounded-md '>{error}</div>}
            <div>Not a member ? <button onClick={handleRegister}>sign in</button></div>
        </div>
    </form>
  )
}

export default Login