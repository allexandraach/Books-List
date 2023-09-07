
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (apiEndpoint) => {

    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState([]);
    const [error, setError] = useState(null);

   useEffect(() => {
    axios.get(apiEndpoint)
        .then(response => {
            if (response.status !== 200) { 
                throw Error('Server data could not be loaded');
            } else { return response.data };
        })
        .then(data => {
            setData(data);
            setOriginalData(data);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            alert(error);
        });
    }, [])

    return {
        data,
        setData,
        originalData,
        setOriginalData,
    };
}
