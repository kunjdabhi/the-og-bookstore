import {useState,useEffect} from 'react';

export const useFetch = (url)=>{
    const [books,setBooks] = useState([]);

    useEffect(()=>{
        try{
            const fetchBooks = async()=>{
                const response = await fetch(url);
                const data = await response?.json();
                
                setBooks(data);
            }
            fetchBooks();
        } catch(e){
            console.log(e);
        }
    },[url])
    
    return {books};
}