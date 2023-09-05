
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { AddBook } from "./components/AddBook/AddBook";
import { BooksList } from "./components/BooksList/BooksList";
import { NotFound404 } from './components/NotFound404/NotFound404';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" index element={<BooksList />} />
          <Route exact path="/add" element={<AddBook />} />
            <Route path="*" element={<NotFound404 />} />
            </Routes>
          </Router>
          );
}
