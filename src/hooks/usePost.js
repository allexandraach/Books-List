
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const usePost = () => {
  const navigate = useNavigate();

  const postData = async (book) => {
    try {
      const response = await axios.post("http://localhost:8000/books",  book );
      
      if (response.status === 201) { 
        alert("You added a new book!");
        navigate('/');
      } else {
        throw new Error("Ooops. Request failed. Please try again later");
      }
    } catch (error) {
      console.error("An error occurred while adding a new book:", error);
    }
  };

  return postData;
};

