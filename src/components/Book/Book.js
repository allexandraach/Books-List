import { useState } from 'react';

export function Book({ element, handleDelete, handleUpdate }) {

  // checkboxes
  const [favourite, setFavourite] = useState(false);
  const [currentlyReading, setCurrentlyReading] = useState(false);
  //  show "Deleting" while the delete request is being processed;
  const [isLoading, setIsLoading] = useState(false);


  function processDeleteRequest(id) {

    setIsLoading(true);
    handleDelete(id);
  }

  return (
    <>
      <li className="book-entry" key={element.id}>

        <div key={`bookData-${element.id}`} className="bookData" >

          <span style={{ fontSize: "large", fontWeight: "bold" }}>
            {element.title}</span> <br /> {element.author}

        </div>

        <span style={{ textAlign: "start", fontSize: "smaller", fontStyle: "italic" }}>

          Currently reading? <input type="checkbox" name="currentlyReading"
            key={`currentlyReading-${element.id}`} value={currentlyReading}
            onChange={(e) => {
              const newValue = e.target.checked;
              handleUpdate(element._id, { ...element, currentlyReading: newValue })
            }}
            checked={element.currentlyReading === true ? "checked" : ""} />

          Favourite? <input type="checkbox" name="favourite" key={`favourite-${element.id}`}
            value={favourite}
            onChange={(e) => {
              const newValue = e.target.checked;
              handleUpdate(element._id, { ...element, favourite: newValue })
            }}
            checked={element.favourite === true ? "checked" : ""} />

        </span>

        <button className="deleteBookBtn" key={`delete-${element.id}`}
          onClick={() => { processDeleteRequest(element._id) }} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"} </button>

        <hr />
      </li>
    </>
  )

};