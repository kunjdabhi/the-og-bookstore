import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";


export const useLogin = ()=>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);
    const {dispatch} = useContext(AuthContext);

    const login = async (email,password)=>{
        try{
            setIsLoading(true);
            const response = await fetch('http://the-og-bookstore.vercel.app/api/user/login',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({email,password})
            })
            
            const json = await response.json();
            
            if(!response.ok){
                setError(json.msg);
                setIsLoading(false);
            }
            if(response.ok){
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({type:'LOGIN',payload:json})
                setError(null);
            } 
        }catch(e){
            setError(e.message);
            console.error(e);
        }

        
    }
    
    return {login,error,isLoading}
}