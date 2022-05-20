import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-50 bg-light text-center p-5 m-auto mt-5'>
        <p className='fs-1 text-danger'>This page doesn't exist</p>
        <Link to='/'>Back to the home page</Link>
    </div>
  )
}

export default NotFound