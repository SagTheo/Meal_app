import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'

const MyMeals = () => {
  const userToken = localStorage.getItem('userToken')

  useEffect(() => {
    fetch(`http://localhost:3001/getMeals/${userToken}`)
      .then(res => res.json())
      .then(response => {
        console.log(response.response)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
        <Navbar />
        Here are your meals
    </div>
  )
}

export default MyMeals