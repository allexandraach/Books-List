
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/nav-bar/nav-bar";
import { AddBook } from "./components/add-book/add-book";
import { FilterableBookList } from "./components/filterable-book-list/filterable-book-list";


export default function App() {
  return (<Router>
    <Navbar />
    <Routes>
      <Route exact path="/" index element={<FilterableBookList />}></Route>
      <Route exact path="/add" element={ <AddBook/>}>
      </Route>
    </Routes>
  </Router>);
}
