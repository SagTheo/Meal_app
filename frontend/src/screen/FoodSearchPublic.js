import React from 'react'
import FoodSearch from '../components/FoodSearch'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'

const FoodSearchPublic = () => {
  return (
    <>
        <div className='d-flex justify-content-end p-2 bg-secondary mb-3'>
          <Link to="/signup" className="m-2 text-decoration-none foodSearch_link">Sign up</Link>
          <Link to="/login" className="m-2 text-decoration-none foodSearch_link">Log in</Link>
        </div>
        <FoodSearch />
    </>
  )
}

export default FoodSearchPublic