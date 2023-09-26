import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useState } from 'react';
import Cart from './pages/Cart';
import cartSlice from "./features/cartSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";

function App() {

  const [selectedBook, setSelectedBook] = useState(localStorage.getItem("selectedBook") ?
    JSON.parse(localStorage.getItem("selectedBook")) : []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route path='/' element={<Home setSelectedBook={setSelectedBook} />} />
          <Route path="/bookDetails" element={<BookDetails selectedBook={selectedBook} />} />
          <Route path='/cart' element={<Cart cart={cartSlice} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout/>} />
          </Route>

        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
