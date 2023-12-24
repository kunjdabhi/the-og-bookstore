import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

const BookDetail = () => {
    const [book,setBook] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        const fetchABook = async ()=>{
            const response = await fetch(`http://the-og-bookstore.vercel.app/api/books/${id}`);
            const book = await response.json();
            if(response.ok){
                setBook(book[0]);
            }
        }
        fetchABook();
    },[])

    let stock;
    if(book.inStock == 0){
        stock = <p className="text-red-600">Out Of Stock</p>
    }else {
        stock = <p className="text-[#384749]">Available</p>
    }

    return ( 
        <div className="relative">
        <section className="flex translate-y-36 ml-52 text-[#384749] ">
            <div className=" min-w-[300px]">
                <img src={book.thumbnail} className="border-2 border-[#576F72] w-[400px] p-5" />
            </div>
            <div className="flex flex-col leading-8 text-lg mx-16 max-w-fit px-12">
                <p className="text-3xl">{book.title} <span className="text-sm">By {book.author}</span> </p>
                <p>Genre: {book.genre}</p>
                {stock}
                <p>Pages: {book.numOfPages}</p>
                <p>Publisher: {book.publisher}</p>
                <div className="mt-2">
                    <span className="text-[1.2rem] mb-2">Overview Of Book:</span>
                    <p className="-mt-2">{book.description}</p>
                </div>
            </div>
        </section>
            <div className="ml-[14rem] text-lg flex gap-3 translate-y-44">
                <button className="px-3 py-1 rounded-md text-[#F0EBE3] bg-[#576F72]" /*onClick={handleWishlistClick}*/>Add to Wishlist</button>
                {/* <Link to={`/books/${book._id}/buy`}>
                    <button className="px-3 py-1 rounded-md text-[#F0EBE3] bg-[#576F72]">Buy Now</button>
                </Link> */} 
                <button className="px-3 py-1 rounded-md text-[#F0EBE3] bg-[#576F72]" /*onClick={handleCartClick}*/>Add to Cart</button>
            </div>
        </div>
     
     );
}
 
export default BookDetail;