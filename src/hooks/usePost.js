
import { useNavigate } from 'react-router-dom';

export const usePost = () => {

  const navigate = useNavigate();

  const postData = async (book) => {

    try {
      const response = await fetch("http://localhost:8000/books", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      });

      if (response.ok) {
        alert("You added a new book!");

      } else {
        throw new Error("Ooops. Request failed. Please try again later");
      }
    } catch (error) {
      console.error("An error while adding new book:", error);
    }

    navigate('/');
  };

  return postData;

};

