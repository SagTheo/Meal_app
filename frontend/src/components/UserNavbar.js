import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'

const UserNavbar = ({ userEmail }) => {
    const navigate = useNavigate()
  
    const logout = () => {
      localStorage.removeItem('userToken')
      navigate('/')
    }

  return (
    <div className='d-flex justify-content-end p-2 bg-secondary mb-3'>
        <p className='me-2 my-2 text-info'>Signed in as {userEmail}</p>
        <Link to="/"
              className="m-2 text-decoration-none foodSearch_link"
        >
          Home
        </Link>
        <Link to='/new-meal'
              className="m-2 text-decoration-none foodSearch_link"
        >Compose a meal
        </Link>
        <Link to='/my-meals'
              className="m-2 text-decoration-none foodSearch_link"
        >My meals
        </Link>
        <Link to="/" 
            className="m-2 text-decoration-none foodSearch_link"
            onClick={logout}
        >Log out
        </Link>
    </div>
  )
}

export default UserNavbar