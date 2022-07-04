import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styles from '../css/MyMeals.module.css'

const MyMeals = () => {
  const userToken = localStorage.getItem('userToken')

  const [mealsToDisplay, setMealsToDisplay] = useState([])

  // To remove meal from MyMeals page. If request successful, document.location.reload()
  // will refresh the current URL which will trigger useEffect() and display user's meals
  const removeMeal = (mealId) => {
    fetch(`http://localhost:3001/meals/removeMeal/${mealId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(response => {
        if (response.response === 'OK') {
          document.location.reload()
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetch(`http://localhost:3001/meals/getMeals/${userToken}`)
      .then(res => res.json())
      .then(response => {
        setMealsToDisplay(response.response)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
        <Navbar />
        <h1 className={styles.h1}>Here are your meals</h1>
        <div className={styles.meals}>
          {
            mealsToDisplay.length > 0 ?
            mealsToDisplay.map(meal => {
              return (
                <div key={meal.key} className={styles.meal}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>Ingredient</th>
                        <th className={styles.th}>Quantity</th>
                      </tr> 
                    </thead>
                    <tbody>
                      {
                        meal.foods.map(food => {
                          return (
                            <tr>
                              <td className={styles.td}>{food.name}</td>
                              <td className={styles.td}>{food.quantity} grams</td> 
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  
                  <p className={styles.p}>Nutritional values:</p>
                  <ul className={styles.ul}>
                    <li><span className={styles.span}>Calories:</span> {meal.values[0]} kcal</li>
                    <li><span className={styles.span}>Protein:</span> {meal.values[1]} grams</li>
                    <li><span className={styles.span}>Carbs:</span> {meal.values[2]} grams</li>
                    <li><span className={styles.span}>Sugar:</span> {meal.values[3]} grams</li>
                    <li><span className={styles.span}>Fat:</span> {meal.values[4]} grams</li>
                    <li><span className={styles.span}>Saturated fat:</span> {meal.values[5]} grams</li>
                    <li><span className={styles.span}>Fiber:</span> {meal.values[6]} grams</li>
                  </ul>

                  <button 
                    className={styles.removeMeal}
                    type='button'
                    onClick={() => removeMeal(meal.key)}
                  >
                    Remove meal
                  </button>
                </div>
              )
            })
            :
            <p className={styles.noMeals}>You have no meals yet</p>
          }
        </div>
    </div>
  )
}

export default MyMeals