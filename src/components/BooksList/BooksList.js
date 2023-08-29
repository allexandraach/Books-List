import axios from "axios";

import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";

import { SearchBar } from "../SearchBar/SearchBar";


export function BooksList() {

  let { data: books, setData: setBooks, originalData: originalBooks } = useFetch("http://localhost:8000/books");

  const [searchBooks, setSearchBooks] = useState("");

  const isFavourite = useState('');
  const currentlyReading = useState('');

  // let genresWithBooks = [];
  // let withGenre = false;
  // let showWithGenre = [];

  function handleDelete(id) {

    const userConfirmed = window.confirm("Are you sure you want to delete this book?");

    if (userConfirmed) {

      axios.delete(`http://localhost:8000/books/${id}`)
        .then(() => {
          alert("Book successfully deleted");
          const withoutDeletedBook = books.filter(elem => elem.id !== id);
          setBooks(withoutDeletedBook);
        })
        .catch(error => {
          console.error("Error deleting book:", error);
        });

    }
  }

  function handleUpdate(id, updatedProperty) {

    axios.put(`http://localhost:8000/books/${id}`, updatedProperty, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Book status updated:', response.data);

      })
      .catch(error => {
        console.error('Error updating book:', error);
      });

  }

  if (searchBooks) {
    books = [...originalBooks.filter((book) => {
      return (book.title.toLowerCase().includes(searchBooks) ||
        book.author.toLowerCase().includes(searchBooks) ||
        book.genre.toLowerCase().includes(searchBooks)
      );
    })]

  } else {
    // if the search bar is empty, show initial book list
    books = originalBooks;
  }


  // filtering & sorting not working 
  
  function filterBooks(category) {

    books = [...originalBooks.filter((book) => book.category)];

  }

  function sortBooks(category) {
    books = [...originalBooks.sort((a, b) => {

      if (a.category === b.category) return -1;

      // book a comes after book b
      if (a.category > b.category) return 1;

      // book a should come before book b
      if (a.category < b.category) return -1;

    })]
  };

  // works but need to find a way to display them

  // newBooks = [...originalBooks.map((book) => {
  // const existingGenre = genresWithBooks.find(genre => genre.name === book.genre);
  // console.log(existingGenre);

  // if (existingGenre) {
  //   existingGenre.books.push(book);
  // } else {
  //   genresWithBooks.push({ name: book.genre, books: [book] });
  //   console.log(genresWithBooks);
  // }})];

  // withGenre = true;


  // if (withGenre) {
  //   showWithGenre = genresWithBooks.map(genre => (
  //     <div key={genre.name}>
  //       <h2>{genre.name}</h2>
  //       <BooksList books={books} ></BooksList>
  //     </div>))
  // };

  const booksList = books.map((element) => (
    <li className="book-entry" key={element.id}>

      <div key={`bookData-${element.id}`} className="bookData" ><span style={{ fontSize: "large", fontWeight: "bold" }}>
        {element.title}</span> <br /> {element.author}</div>
      <span style={{ textAlign: "start", fontSize: "smaller", fontStyle: "italic" }}>
        Currently reading? <input type="checkbox" name="currentlyReading" key={`currentlyReading-${element.id}`} value={currentlyReading}
          onChange={(e) => {
            const newValue = e.target.checked;
            handleUpdate(element.id, { ...element, currentlyReading: newValue })
          }}
          checked={element.currentlyReading === true ? "checked" : ""} />

        Favourite? <input type="checkbox" name="favourite" key={`favourite-${element.id}`} value={isFavourite}
          onChange={(e) => {
            const newValue = e.target.checked;
            handleUpdate(element.id, { ...element, isFavourite: newValue })
          }}
          checked={element.isFavourite === true ? "checked" : ""} />

      </span>

      <button className="deleteBookBtn" key={`delete-${element.id}`} onClick={() => { handleDelete(element.id) }}>Delete</button>
      <hr />
    </li>
  ))

  return <>
    <SearchBar searchBooks={searchBooks} setSearchBooks={setSearchBooks}
      filterBooks={filterBooks} sortBooks={sortBooks} />
    {/* {(withGenre && <div> {showWithGenre} </div>) || */}
    <ol> {booksList}</ol>
  </>

}
