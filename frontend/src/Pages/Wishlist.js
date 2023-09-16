import React from 'react';
import { useContext } from 'react';
import { AuthContext} from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { WishListContext } from '../Context/WishlistContext';

const Wishlist = ()=>{
    const {user} = useContext(AuthContext);
    const {state, dispatch} = useContext(WishListContext);
    const wishlists = state.wishListedBooks;

    const handleRemoveWishlist = async(book)=>{
        dispatch({type: 'REMOVE_WISHLIST', payload:book});
        const wishlist = await fetch(`/api/wishlist/${book._id}`, {
            method:'POST',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
    }
   

    if(wishlists && wishlists.length === 0){
        return (
            <div className='flex content center relative'>
                <h1 className='translate-y-[22.5rem] mx-auto font-bold text-[2rem] text-[#384749]'>Wishlist is Empty</h1>
            </div>
        ) 
    } else {
        return (
   
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 translate-y-16">
            {wishlists && wishlists.map((item)=>{
                return (
                    <div className="group flex flex-col rounded-md hover:shadow-lg transition-shadow py-5 px-3 text-[#384749] min-h-full relative" key={item._id}>
                        <Link to={`/books/${item._id}`} className="">
                            <div className="m-2">
                            <img src={item.thumbnail} alt="Thumnail of book" className="group-hover:scale-[1.1] transition-all h-60 w-44 rounded-lg shadow-xl mx-auto" />
                            </div>  
                        <div className="text-center p-2 mb-7">
                            <p className="font-semibold text-lg">{item.title}</p>
                            <p className="">{item.author}</p>
                            <p>Genre: {item.genre}</p>
                            <span className="text-lg font-semibold">{item.price}₹</span>
                        </div>
                        </Link>
                        <div className="absolute bottom-0 left-[50%] -translate-x-[50%] flex mb-3">
                            <button className="px-1 py-1 rounded-md text-[#F0EBE3] bg-[#576F72] w-44 mr-2">Add to Cart</button>
                        </div>
                            <AiOutlineClose className='absolute right-2 cursor-pointer' size={25} data-tip="Remove from Wishlist" data-delay-hide='1000' onClick={()=>{
                                handleRemoveWishlist(item)
                            }}/>
                        
                     </div>
                )
            })}
        </div>
    )
    }
}

export default Wishlist;
