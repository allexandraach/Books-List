
import { useFetch } from '../../hooks/useFetch';
import { useState } from 'react';

export function BooksList({ books }) {

  const { reRender, setReRender } = useFetch("http://localhost:8000/books");
  const [isFavourite, setFavourite] = useState('');
  const [currentlyReading, setCurrentlyReading] = useState('');

  function handleUpdate(id, newValue) {

    // not working due to CORS being activated
    fetch(`http://localhost:8000/books/` + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newValue}),
    })
      .then(response => response.json())
      .then(updatedData => {
        console.log('Book status updated:', updatedData);
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  }


  function handleDelete(id) {

    if (confirm("Are you sure you want to delete this book?")) {

      fetch(`http://localhost:8000/books/` + id, {
        method: 'DELETE'
      }).then(() => {
        alert("Book successfully deleted")
        // not triggering the re-rendering of the component
        setReRender(true);
      })

    } else {

    }

    // // filter out the deleted book from the component
    // const withoutDeletedBook = books.filter(elem => elem.id !== id);
    // setBooks(withoutDeletedBook);
  }

  // future improvement: implement select multiple books to edit

  return <ol>
    {books && books.map((element) => (
      <li className="book-entry" key={element.id}>

        <div key={`bookData-${element.id}`} className="bookData" ><span style={{ fontSize: "large", fontWeight: "bold" }}>
          {element.title}</span> <br /> {element.author}</div>
        <span style={{ textAlign: "start", fontSize: "smaller", fontStyle: "italic" }}>
          Currently reading? <input type="checkbox" name="currentlyReading" key={`currentlyReading-${element.id}`} value={currentlyReading} 
          onChange={(e) => { handleUpdate(element.id, e.target.checked ? setCurrentlyReading(true) : setCurrentlyReading(false))}} 
          checked= {element.isFavourite === true ? "checked" : ""} />

          Favourite? <input type="checkbox" name="favourite" key={`favourite-${element.id}`} value={isFavourite} 
          onChange={(e) => { handleUpdate(element.id, e.target.checked ? setFavourite(true) : setFavourite(false)) }} 
          checked= {element.isFavourite === true ? "checked" : ""}  />

        </span>

        <button className="deleteBookBtn" key={`delete-${element.id}`} onClick={() => { handleDelete(element.id) }}>Delete</button>
        <hr />
      </li>
    ))}
  </ol>

};