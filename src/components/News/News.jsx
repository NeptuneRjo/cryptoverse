import React from 'react'
import store from '../../store'

const News = () => {
  
  store.dispatch(
    { type: 'SET_NAVBAR', payload: 'news' }
  )

  return (
    <div>News</div>
  )
}

export default News