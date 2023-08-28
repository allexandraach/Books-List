import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";

import { SearchBar } from "../search-bar/search-bar";
import { BooksList } from "../books-list/books-list";


export function FilterableBookList() {

  const { data: books, setData: setBooks, originalData: originalBooks,
    setOriginalData: setOriginalBooks } = useFetch("http://localhost:8000/books");

  const [searchBooks, setSearchBooks] = useState("");

  const [sortByAuthor, setSortByAuthor] = useState(false);
  const [sortByGenre, setSortByGenre] = useState(false);

  const [filterByCurrentlyReading, setFilterByCurrentlyReading] = useState(false);
  const [filterByFavourite, setFilterByFavourite] = useState(false);


  // let withGenre = false;

  useEffect(() => {

    let newBooks;

    if (searchBooks) {
      newBooks = [...originalBooks.filter((book) => {
        return (book.title.toLowerCase().includes(searchBooks) ||
          book.author.toLowerCase().includes(searchBooks) ||
          book.genre.toLowerCase().includes(searchBooks)
        );
      })
      ];
    } else {
      // if the search bar is empty, show initial book list
      newBooks = books;
    }

    if (filterByCurrentlyReading) {
      newBooks = [...originalBooks.filter((book) => book.currentlyReading)];
    }

    if (filterByFavourite) {
      newBooks = [...originalBooks.filter((book) => book.isFavourite)];
    }

    if (sortByAuthor) {
      newBooks = [...originalBooks.sort((a, b) => {

        // group authors that share the same author together
        if (a.author === b.author) return -1;

        // book a comes after book b
        if (a.author > b.author) return 1;

        // book a should come before book b
        if (a.author < b.author) return -1;

      })];

    }

    if (sortByGenre) {

      newBooks = [...originalBooks.sort((a, b) => {

        if (a.genre < b.genre) {
          return -1;
        }
        if (a.genre > b.genre) {
          return 1;
        }
        return 0;

      })]
    };

    // working but need to find a way to display them

    // const existingGenre = genresWithBooks.find(genre => genre.name === book.genre);
    // console.log(existingGenre);

    // if (existingGenre) {
    //   existingGenre.books.push(book);
    // } else {
    //   genresWithBooks.push({ name: book.genre, books: [book] });
    //   console.log(genresWithBooks);
    // }

    // withGenre = true;

    setBooks(newBooks);

  }, [searchBooks, sortByAuthor, sortByGenre, filterByCurrentlyReading, filterByFavourite]);


  function handleFilterChange(event) {

    const selectedValue = event.target.value;

    if (selectedValue === "currentlyReading") {
      setFilterByCurrentlyReading(true);
      setFilterByFavourite(false);

    } else {
      setFilterByCurrentlyReading(false);
      setFilterByFavourite(true);

    }

  }

  function handleSortChange(event) {

    const selectedValue = event.target.value;

    if (selectedValue === "genre") {
      setSortByAuthor(false);
      setSortByGenre(true);

    } else {
      setSortByAuthor(true);
      setSortByGenre(false);
    }

  }

  return <>
    <SearchBar searchBooks={searchBooks} setSearchBooks={setSearchBooks} handleFilterChange={handleFilterChange} handleSortChange={handleSortChange} />
    {/* not working */}
    {/* {withGenre && genresWithBooks.map(genre => (
      <div key={genre.name}>
        <h2>{genre.name}</h2>
        <BooksList books={books} setBooks={setBooks} />
      </div>
    ))}
    {withGenre || <BooksList books={books} setBooks={setBooks} />} */}
    <BooksList books={books} />
  </>

}
