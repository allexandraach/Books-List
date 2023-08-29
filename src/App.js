
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { AddBook } from "./components/AddBook/AddBook";
import { BooksList } from "./components/BooksList/BooksList";


export default function App() {
  return (<Router>
    <Navbar />
    <Routes>
      <Route exact path="/" index element={<BooksList />}></Route>
      <Route exact path="/add" element={ <AddBook/>}>
      </Route>
    </Routes>
  </Router>);
}
