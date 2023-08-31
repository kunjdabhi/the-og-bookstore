import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useSignup = ()=>{
        const [loading,setLoading] = useState(null)
        const [error,setError] = useState(null)
        const {dispatch} = useContext(AuthContext);

        const signup = async(email,password)=>{
            setLoading(true)

            const response = await fetch('/api/user/signup',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({email,password})
            })
            const json = await response.json();
            if(!response.ok){
                setLoading(false);
                setError(json.msg);
            } 

            if(response.ok){
                dispatch({type:'LOGIN',payload:json})
                setError(null);
            } 
    }
    
    return {signup,error,loading}
}