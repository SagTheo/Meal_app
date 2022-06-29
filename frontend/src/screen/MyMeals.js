import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const MyMeals = () => {
  const userToken = localStorage.getItem('userToken')

  const [mealsToDisplay, setMealsToDisplay] = useState()

  useEffect(() => {
    fetch(`http://localhost:3001/getMeals/${userToken}`)
      .then(res => res.json())
      .then(response => {
        setMealsToDisplay(response.response)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
        <Navbar />
        Here are your meals
        {
          mealsToDisplay ?
          mealsToDisplay.map(meal => {
            return (
              <div>
                {
                  meal.foods.map(food => {
                    return (
                      <p>{food.name} {food.quantity}</p>
                    )
                  })
                }

                <ul>
                  <li>Calories: {meal.values[0]}</li>
                  <li>Protein: {meal.values[1]}</li>
                  <li>Carbs: {meal.values[2]}</li>
                  <li>Sugar: {meal.values[3]}</li>
                  <li>Fat: {meal.values[4]}</li>
                  <li>Saturated fat: {meal.values[5]}</li>
                  <li>Fiber: {meal.values[6]}</li>
                </ul>
              </div>
            )
          })
          :
          null
        }
    </div>
  )
}

export default MyMeals