
import { useState } from 'react';
import { usePost } from '../../hooks/usePost';

export const AddBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isFavourite, setFavourite] = useState('');
  const [currentlyReading, setCurrentlyReading] = useState('');
  const postData = usePost();

  const handleSubmit = (e) => {

    e.preventDefault();
    const book = { title, author, genre, isFavourite, currentlyReading };
    console.log(book);
    postData(book);
  }

  return <form className="bookForm" onSubmit={handleSubmit}>
    <fieldset>
      <legend>Input book details</legend>

      <label htmlFor="bookTitle">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="bookTitle" placeholder="Enter book's title" required />
      </label>

      <label htmlFor="authorName">
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} name="author" id="authorName" placeholder="Enter author's name" required />
      </label>

      <label htmlFor="bookGenre">
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} name="genre" id="bookGenre" placeholder="Enter book's genre" required />
      </label>

      <br />

      <label htmlFor="currentlyReading">
        Currently reading?  {" "} <input value={currentlyReading} onChange={(e) => e.target.checked ? setCurrentlyReading(true) : setCurrentlyReading(false)} type="checkbox" name="currentlyReading" id="currentlyReading" />
      </label>

      <label htmlFor="favourite">
        {" "} Favourite?  {" "}<input value={isFavourite} onChange={(e) => e.target.checked ? setFavourite(true) : setFavourite(false)} type="checkbox" name="favourite" id="favourite" /></label>

      <br />

      <button id="addBookBtn" >Add book!</button>

    </ fieldset>
  </form>

};