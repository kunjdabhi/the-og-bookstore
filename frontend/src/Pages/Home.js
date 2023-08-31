import BookCard from '../Components/BookCard';
import { WishListContext } from '../Context/WishlistContext';
import { useFetch } from "../Hooks/useFetch";
import { useContext } from 'react';


const Home = () => {
    const {books} = useFetch('/api/books');
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 translate-y-16">
            {books && books.map((book)=>{
                return (
                    <BookCard  key={book._id} book={book}/>
                )
            })}
        </div>
     );
    
}
 
export default Home;