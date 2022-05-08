import { useEffect } from 'react'
import store from '../store'

const fetchApi = (url, host, type) => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': host,
			'X-RapidAPI-Key': process.env.REACT_APP_X_RPD_KY,
		},
	}

	const abortCont = new AbortController()

	fetch(url, options)
		.then((res) => {
			if (!res.ok) {
				throw Error('could not fetch the data for that resource')
			}
			return res.json()
		})
		.then((data) => {
			store.dispatch({ type: `${type}_FETCH_COMPLETED`, payload: data })
		})
		.catch((err) => {
			if (err.name === 'AbortError') {
				console.log('fetch aborted')
			} else {
				store.dispatch({ type: `${type}_FETCH_FAILED`, payload: err })
			}
		})

	return () => abortCont.abort()
}

export default fetchApi
