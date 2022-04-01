import { useEffect, useState } from 'react';
import store from '../store';

const useFetch = (url, host, type) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': host,
            'X-RapidAPI-Key': process.env.REACT_APP_X_RPD_KY
        }
    };

    // store.dispatch({type: `${type}_FETCH_PENDING`});
  
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
                // setData(data);

                store.dispatch(
                    {type:`${type}_FETCH_COMPLETED`, payload: data}
                );

                // setIsPending(false);
                // setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    store.dispatch(
                        {type: `${type}_FETCH_FAILED`, payload: error}
                    );

                    // setError(err.message);
                    // setIsPending(false);
                }
            });
            
            return () => abortCont.abort();
    }, []);

    // return { data, isPending, error };
    return;
}

export default useFetch

// import { 
//     fetchApisBegin, 
//     fetchApisSuccess, 
//     fetchApisFailure
// } from "./apiActions";
// import { useEffect, useState } from "react";

// function useFetch(url, host) {

//     const [data, setData] = useState(null);
//     const [isPending, setIsPending] = useState(true);
//     const [error, setError] = useState(null);


//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': host,
//             'X-RapidAPI-Key': process.env.REACT_APP_X_RPD_KY
//         }
//     };

//     return dispatch => {
//         dispatch(fetchApisBegin());
//         fetch(url, options)
//         .then(res => res.json())
//         .then(res => {
//             if(res.error) {
//                 throw(res.error);
//             }
//             dispatch(fetchApisSuccess(res.data))
//             return res.data
//         })
//         .catch(error => {
//             dispatch(fetchApisFailure(error))
//         })
//     }
// }

// export default fetchProducts