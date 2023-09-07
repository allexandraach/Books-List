import axios from "axios";

import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useRef } from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { Book } from "../Book/Book";


export function BooksList() {

  const { data: books, setData: setBooks, originalData: originalBooks } = useFetch("http://localhost:8080/api/books");
  const [searchBooks, setSearchBooks] = useState("");
  const pageNumberRef = useRef(2);

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

    updateUrl(category, true);

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

    updateUrl("sort", category);

    axios.get(`http://localhost:8080/api/books/sort?sort=${category}`)
      .then(response => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch(error => {
        alert(error);
      });
  }

  function loadMoreBooks() {

    const pageNumber = pageNumberRef.current;

    fetch(`http://localhost:8080/api/books/view?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        const moreBooks = books.concat(data);
        setBooks(moreBooks);
        console.log(moreBooks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    pageNumberRef.current = pageNumber + 1;

  }

  function updateUrl(key, value) {
    const updatedUrl = new URLSearchParams
      ({ [key]: value }).toString();

    // Replace the current URL with the updated URL
    window.history.replaceState(null, null, `books?${updatedUrl}`);
  }


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
      <div style={{ display: 'flex', justifyContent: 'center' }}> <button id="viewMoreBtn"
        onClick={loadMoreBooks}> View more
      </button>
      </div>
    </>
  )
}
