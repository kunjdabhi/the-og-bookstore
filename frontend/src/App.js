import React from 'react';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import BookDetail from './Pages/BookDetail';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Signup from './Pages/Signup'
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar />}

        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to="/user/login"/>} />
          <Route path='/books/:id' element={<BookDetail />} />
          {/* <Route path='/books/:id/buy' element={<BuyNow />} /> */}
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;