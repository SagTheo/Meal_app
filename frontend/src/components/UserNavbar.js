import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'
import { UserContext } from '../context/user-context';

const UserNavbar = () => {
    const token = useContext(UserContext)
    const [userEmail, setUserEmail] = useState()
    const navigate = useNavigate()
  
    const logout = () => {
      token.changeUserState(null)
      navigate('/')
    }
  
    useEffect(() => {
      fetch(`http://localhost:3001/home/${token.userState}`)
          .then(res => res.json())
          .then(data => setUserEmail(data.email[0].email))
          .catch(err => console.log(err))
    }, [])

  return (
    <div className='d-flex justify-content-end p-2 bg-secondary mb-3'>
        <p className='me-2 my-2 text-info'>Signed in as {userEmail}</p>
        <Link to="/home"
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