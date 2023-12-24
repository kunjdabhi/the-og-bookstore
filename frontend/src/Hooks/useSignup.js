import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useSignup = ()=>{
        const [loading,setLoading] = useState(null)
        const [error,setError] = useState(null)
        const {dispatch} = useContext(AuthContext);
        const signup = async(user)=>{
            setLoading(true)
            try{
                const response = await fetch('http://the-og-bookstore.vercel.app/api/user/signup',{
                    method:'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({email:user.email, firstname:user.firstname, lastname:user.lastname, password:user.password, mobile:user.mobile})
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
            } catch(e){
                console.log(e)
            }
    }
    
    return {signup,error,loading}
}