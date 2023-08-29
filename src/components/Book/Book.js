import { useState } from 'react';

export function Book({ books, handleDelete, handleUpdate }) {

  const [isFavourite, setFavourite] = useState('');
  const [currentlyReading, setCurrentlyReading] = useState('');


  // return <ol>
  //   {books && books.map((element) => (
  //     <li className="book-entry" key={element.id}>

  //       <div key={`bookData-${element.id}`} className="bookData" ><span style={{ fontSize: "large", fontWeight: "bold" }}>
  //         {element.title}</span> <br /> {element.author}</div>
  //       <span style={{ textAlign: "start", fontSize: "smaller", fontStyle: "italic" }}>
  //         Currently reading? <input type="checkbox" name="currentlyReading" key={`currentlyReading-${element.id}`} value={currentlyReading} 
  //         onChange={(e) => {
  //           const newValue = e.target.checked;
  //           handleUpdate(element.id, {...element, currentlyReading: newValue }) }} 
  //         checked= {element.currentlyReading === true ? "checked" : ""} />

  //         Favourite? <input type="checkbox" name="favourite" key={`favourite-${element.id}`} value={isFavourite} 
  //         onChange={(e) => { 
  //           const newValue = e.target.checked;
  //           handleUpdate(element.id, {...element,  isFavourite: newValue }) }} 
  //         checked= {element.isFavourite === true ? "checked" : ""}  />

  //       </span>

  //       <button className="deleteBookBtn" key={`delete-${element.id}`} onClick={() => { handleDelete(element.id) }}>Delete</button>
  //       <hr />
  //     </li>
  //   ))}
  // </ol>

};