
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const usePost = () => {

  const navigate = useNavigate();

  const postData = async (book) => {

    try {
      const response = await axios.post("http://localhost:8080/api/add", book);

      if (response.status === 201) {
        navigate('/');
      }

    } catch (error) {

      if (error.response.data.error === "MongoServerError") {
        alert(`Oops! The book ${book.title} already exists in your list.`);
      } else if (error.response.data.error === "ValidationError") {
        alert('Please enter valid data');
      } else {
        console.error("An error occurred while adding a new book:", error);
      }

    }
  };

  return postData;
};

