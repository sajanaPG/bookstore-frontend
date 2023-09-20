import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import { useState } from 'react';
function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout/>}>
          <Route path='/' element={<Home setSelectedBook={setSelectedBook}/>}/>
          <Route path="/bookDetails" element={<BookDetails selectedBook={selectedBook}/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
