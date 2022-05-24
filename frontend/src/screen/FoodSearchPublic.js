import React from 'react'
import FoodSearch from '../components/FoodSearch'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'
import Navbar from '../components/Navbar'

const FoodSearchPublic = () => {
  return (
    <>
        <Navbar />
        <FoodSearch />
    </>
  )
}

export default FoodSearchPublic