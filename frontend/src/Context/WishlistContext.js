import { createContext, useState, useReducer, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext();
export const bookReducer = (state,action)=>{
    switch(action.type){
        case 'SET_WISHLIST':
            return{
                wishListedBooks: action.payload
            } 
        case 'UPDATE_WISHLIST':
            return{
                wishListedBooks:[action.payload, ...state.wishListedBooks]
            }
        case 'REMOVE_WISHLIST':
            const list = state.wishListedBooks.filter(item => item._id != action.payload._id);
            return {
                wishListedBooks: list
            }     
    }
}


export const WishListContextProvider = ({children})=>{

    const [wishlist, setWishlist] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        try{    
            
            const fetchWishlist = async ()=>{
                const books = await fetch('https://the-og-bookstore.vercel.app/api/wishlist',{
                    headers:{
                        'Authorization':`Bearer ${user.token}`,
                    }
                })
                const wishlistedBook = await books?.json();
                const temp = wishlistedBook.wishlist;
                setWishlist(temp);
            }
            if(user){
                fetchWishlist();
            }
        } catch(e){
            console.log('error in getting the user\'s wishlist');
        }
    },[])
    
    const [state, dispatch] = useReducer(bookReducer,[wishlist])
    useEffect(() => {
        dispatch({ type: 'SET_WISHLIST', payload: wishlist });
    }, [wishlist]);

    return (
        <WishListContext.Provider value={{state,dispatch}}>
            {children}
        </WishListContext.Provider>
    )
}
