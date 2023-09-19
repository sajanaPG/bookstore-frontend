import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path="book/:id" element={<BookDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
