import { Link } from "react-router-dom";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { useContext } from 'react';
import { WishListContext } from "../Context/WishlistContext";
import { AuthContext } from "../Context/AuthContext";
import { useFetch } from "../Hooks/useFetch";

const BookCard = ({book}) => {
    const {user} = useContext(AuthContext);
    const {state,dispatch} = useContext(WishListContext)
    let present = false;
    for(let i =0;i<state.wishListedBooks.length;i++){
        if ( book._id === state.wishListedBooks[i]._id){
            present = true;
            break;
        }
    }
    const addToWishlist = async()=>{
        if(present){
            dispatch({type: 'REMOVE_WISHLIST', payload:book});
            const wishlist = await fetch(`https://the-og-bookstore.vercel.app/api/wishlist/${book._id}`, {
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            present = false;
            return;
        }
        const wishlist = await fetch(`/api/wishlist/${book._id}`, {
            method:'POST',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        dispatch({type:"UPDATE_WISHLIST", payload:book});      
    }
    
    return (    
        
        <div className="group flex flex-col rounded-md hover:shadow-lg transition-shadow py-5 px-3 text-[#384749] min-h-full relative">
            <Link to={`/books/${book._id}`} className="">
                <div className="m-2">
                <img src={book.thumbnail} alt="Thumnail of book" className="h-60 w-44 rounded-lg shadow-xl mx-auto group-hover:scale-[1.1] transition-all" />
                </div>
                <div className="text-center p-2 mb-7">
                    <p className="font-semibold text-lg">{book.title}</p>
                    <p className="">{book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <span className="text-lg font-semibold">₹{book.price}</span>
                </div>
            </Link> 
            <div className="absolute bottom-0 left-[50%] -translate-x-[50%] flex mb-3">
                <button className="px-1 py-1 rounded-md text-[#F0EBE3] bg-[#576F72] w-44 mr-2" >Add to Cart</button>
                {state.wishListedBooks && <button onClick={addToWishlist} id={book._id} >
                    {present ? <AiFillHeart className='cursor-pointer bg-[#576F72] rounded-md px-1 py-1' size={30} color="#F0EBE3" /> : <AiOutlineHeart className='cursor-pointer bg-[#576F72] rounded-md px-1 py-1' size={30} color="#F0EBE3" />}
                </button>}
            </div>
        </div>
        
     );
} 
 
export default BookCard;