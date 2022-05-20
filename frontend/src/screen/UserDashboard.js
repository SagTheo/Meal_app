import React, { useEffect, useState } from 'react'
import FoodSearch from '../components/FoodSearch'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'

const UserDashboard = () => {
  const userToken = localStorage.getItem('userToken')
  const [userEmail, setUserEmail] = useState()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('userToken')
    navigate('/')
  }

  useEffect(() => {
    fetch(`http://localhost:3001/dashboard/${userToken}`)
        .then(res => res.json())
        .then(data => setUserEmail(data.email[0].email))
        .catch(err => console.log(err))
  }, [])

  return (
    <>
        <div className='d-flex justify-content-end p-2 bg-secondary mb-3'>
          <p className='me-2 my-2 text-info'>Signed in as {userEmail}</p>
          <Link to="/" 
                className="m-2 text-decoration-none foodSearch_link"
                onClick={logout}
          >Log out</Link>
        </div>
        <FoodSearch />
    </>
  )
}

export default UserDashboard