import {Link, useNavigate} from 'react-router-dom';
import {BsCartDash} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import {MdOutlineAccountCircle} from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { WishListContext } from '../Context/WishlistContext';


const Navbar = () => {
    const {dispatch,user} = useContext(AuthContext);
    const navigator = useNavigate();
    const {state} = useContext(WishListContext);
    // console.log(state.wishListedBooks[0]);
    const wishlist = state.wishListedBooks;
    const logoutHandler = ()=>{
        localStorage.removeItem('user');
        dispatch({type:'LOGOUT'});
        navigator('/user/login');
    }


    return ( 
        <header className='navbar flex items-center justify-between bg-[#576F72] h-16 w-full fixed z-10'>
            <Link to='/' className="logo decoration-0 text-[2rem] font-bold ml-9 text-[#F0EBE3]">The OG Book Store</Link>
            <div className='flex content-center items-center'>
                <input type='text' placeholder='Search' className='search-bar outline-none rounded-lg mr-9 px-5 py-2'></input>
                <Link to='/wishlist' className='relative'>
                    {wishlist && wishlist.length===0 ? <span className='hidden'/> : <span className='absolute bg-[#F0EBE3] rounded-[50%] text-[#384749] px-2 text-sm font-semibold right-5 -top-2'>{wishlist ? wishlist.length : " "}</span>}
                    <AiOutlineHeart className='mr-8 cursor-pointer wishlist before:block before:bg-red' size={30} color="#F0EBE3"/>
                </Link>
                <Link to='/cart' className='relative' >
                    {/* {cart===0 ? <span className='hidden' /> : <span className='absolute bg-[#F0EBE3] rounded-[50%] text-[#384749] px-2 text-sm font-semibold -top-2 left-3'>{cart}</span>}     */}
                    <BsCartDash className='mr-8 cursor-pointer' size={28} color="#F0EBE3"/>
                </Link>
                <MdOutlineAccountCircle className='mr-6 cursor-pointer wishlist before:block before:bg-red' size={30} color="#F0EBE3"/>
                {user && <button className="px-4 py-1 rounded-md mr-4 text-[#576F72] bg-[#F0EBE3]" onClick={logoutHandler} >Logout</button>}
            </div>
        </header>
     );
}
 
export default Navbar;