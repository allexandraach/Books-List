import { useState, useEffect } from 'react';

export const useFetch = (apiEndpoint) => {

    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState([]);
    const [error, setError] = useState(null);
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) { // error coming back from server
                    throw Error('Server data could not be loaded');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setOriginalData(data);
                setError(null);
            })
            .catch(error => {
                // connection error
                setError(error.message);
                alert(error);
            })
    }, [reRender])

    return {
        data,
        setData,
        originalData,
        setOriginalData,
        reRender,
        setReRender
    };
}
