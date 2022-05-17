import React from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

const FoodInfo = ({ name, calories, protein, carbs, sugar, fat, saturatedFat, fiber, quantity }) => {
  const calculate = (value, quantity) => {
    return Math.round(((quantity / 100) * value) * 10) / 10
  }
  
  return (
    <div>
      <Table striped className='caption-top'>
        <caption className='text-center'>{name[0].toUpperCase() + name.slice(1)}</caption>
        <thead>
          <tr>
            <th>Nutritional value for</th>
            <th>{quantity} grams</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calories</td>
            <td>{calories === null ? 'Insignificant' : calculate(calories, quantity) + ' kcal'}</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{protein === null ? 'Insignificant' : calculate(protein, quantity) + ' grams'}</td>
          </tr>
          <tr>
            <td>Carbs</td>
            <td>{carbs === null ? 'Insignificant' : calculate(carbs, quantity) + ' grams'}</td>
          </tr>
          <tr>
            <td>Sugar</td>
            <td>{sugar === null ? 'Insignificant' : calculate(sugar, quantity) + ' grams'}</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{fat === null ? 'Insignificant' : calculate(fat, quantity) + ' grams'}</td>
          </tr>
          <tr>
            <td>Saturated fat</td>
            <td>{saturatedFat === null ? 'Insignificant' : calculate(saturatedFat, quantity) + ' grams'}</td>
          </tr>
          <tr>
            <td>Fiber</td>
            <td>{fiber === null ? 'Insignificant' : calculate(fiber, quantity) + ' grams'}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default FoodInfo