import { useEffect, useState } from 'react';

const useFetch = (url, host) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': host,
            'X-RapidAPI-Key': '8ab56c9046mshf9298833651359cp1b0994jsndcc03fa4cad9'
        }
    };
  
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController()

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });
            
            return () => abortCont.abort();
    }, []);

    return { data, isPending, error };
}

export default useFetch