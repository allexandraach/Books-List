import axios from "axios";

import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { Book } from "../Book/Book";


export function BooksList() {

  const { data: books, setData: setBooks, originalData: originalBooks } = useFetch("http://localhost:8080/api/books");

  const [searchBooks, setSearchBooks] = useState("");

  function handleDelete(id) {

    const userConfirmed = window.confirm("Are you sure you want to delete this book?");

    if (userConfirmed) {

      axios.delete(`http://localhost:8080/api/books/${id}`)
        .then((response) => {

          if (response.status === 200) {
            alert("Book successfully deleted");
            setBooks(prevBooks => prevBooks.filter(elem => elem._id !== id));
          }

        })
        .catch(error => {
          console.error("Error deleting book:", error);
        });

    }
  }

  function handleUpdate(id, updatedProperty) {

    axios.put(`http://localhost:8080/api/books/${id}`, updatedProperty, {
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

  function search(text) {

    setSearchBooks(text.toLowerCase());

    const searchResults = [...originalBooks].filter((book) => {
      return (book.title.toLowerCase().includes(text) ||
        book.author.toLowerCase().includes(text) ||
        book.genre.toLowerCase().includes(text)
      );
    })

    setBooks(searchResults);

  }

  function filterBooks(category) {

    axios.get(`http://localhost:8080/api/books/filter?${category}=true`)
      .then(response => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch(error => {
        alert(error);
      });
  }

  function sortBooks(category) {

    axios.get(`http://localhost:8080/api/books/sort?sort=${category}`)
      .then(response => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch(error => {
        alert(error);
      });
  }


  // function filterBooks(category) {

  //   const filteredBooks = [...originalBooks].filter((book) => book[category] === true);

  //   setBooks(filteredBooks);

  // }

  // function sortBooks(category) {

  //   const sortedBooks = [...originalBooks].sort((a, b) => {

  //     if (a[category] === b[category]) return -1;

  //     // book a comes after book b
  //     if (a[category] > b[category]) return 1;

  //     // book a should come before book b
  //     if (a[category] < b[category]) return -1;

  //     return 0;
  //   })

  //   setBooks(sortedBooks);

  // };


  return (
    <>
      <SearchBar searchBooks={searchBooks} setSearchBooks={setSearchBooks} search={search}
        filterBooks={filterBooks} sortBooks={sortBooks} />
      <ol>
        {books && books.map((element) => {
          return <Book key={element._id} element={element} handleDelete={handleDelete} handleUpdate={handleUpdate}
          />
        })}
      </ol>
    </>
  )
}
