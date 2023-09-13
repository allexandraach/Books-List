import axios from "axios";

import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import { useRef } from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { Book } from "../Book/Book";


export function BooksList() {

  const { data: books, setData: setBooks, originalData: originalBooks } = useFetch("http://localhost:8080/api/books");

  // for displaying more than 10 books on the page
  const pageNumberRef = useRef(2);

  // disable viewMoreBooks Btn if filter, sort or search is active
  const [disableBtn, setDisableBtn] = useState(false);

  // for displaying 'Searching Books...' & 'Deleting...' to the user
  const isLoading = useRef(false);

  // for search function
  const [searchBooks, setSearchBooks] = useState('');
  const [searchResult, setSearchResult] = useState('');
  let searchQuery = '';

  function handleDelete(id) {

    const userConfirmed = window.confirm("Are you sure you want to delete this book?");

    if (userConfirmed) {

      axios.delete(`http://localhost:8080/api/books/${id}`)
        .then((response) => {

          if (response.status === 200) {
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

  async function search(text) {

    // disable view more books btn;
    setDisableBtn(true);

    // display 'loading books' to user
    isLoading.current = true;

    searchQuery += text;

    console.log(searchQuery);

    // display what the user is typing in the search input
    setSearchBooks(searchQuery);

    if (searchQuery.length >= 1) {

      try {
        const response = await axios.get(`http://localhost:8080/api/books/search?q=${searchQuery}`);
        console.log(response.data);
        updateUrl('q', searchQuery);
        setSearchResult(response.data);
        setBooks(response.data);

        // is server found a match, stop displaying 'searching...'
        if (response.data.length !== 0) {
          isLoading.current = false;
        }
        
      } catch (error) {
        alert(error);
      }
    }

    // if search bar is empty, show the initial list of books
   if (searchQuery === '') {
    isLoading.current = false;
    setBooks(originalBooks);
  }
}

function filterBooks(type, category) {

// disable view more books btn
  setDisableBtn(true);

  axios.get(`http://localhost:8080/api/books/${type}?${type}=${category}`)
    .then(response => {
      console.log(response.data);
      updateUrl(type, category);
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
      if (data.length === 0) {
        setDisableBtn(true);
        alert('All the books are already displayed.');
      } else {
        const moreBooks = books.concat(data);
        setBooks(moreBooks);
        updateUrl("page", pageNumber);
        console.log(moreBooks)
      };
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  pageNumberRef.current = pageNumber + 1;

}

function updateUrl(key, value) {
  const updatedUrl = new URLSearchParams({ [key]: value }).toString();

  // Replace the current URL with the updated URL
  window.history.replaceState(null, null, `books?${updatedUrl}`);

}

return (
  <>
    <SearchBar searchBooks={searchBooks} setSearchBooks={setSearchBooks} search={search}
      filterBooks={filterBooks} disableBtn={disableBtn} setDisableBtn={setDisableBtn}
    />
    <ol>

      {!books && !searchBooks && <p style={{ fontSize: 'larger' }}> Loading books...</p>}
      {isLoading.current && <p style={{ fontSize: 'larger' }}> Searching books...</p>}

      {books && books.map((element) => {
        return <Book key={element._id} element={element} handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      })}

    </ol>

    {books && <div style={{ display: 'flex', justifyContent: 'center' }}> <button id="viewMoreBtn"
      onClick={loadMoreBooks} disabled={disableBtn}> View more
    </button>

    </div>}

  </>
)
}
