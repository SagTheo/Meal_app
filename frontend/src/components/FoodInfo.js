import React from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

const FoodInfo = ({ name, calories, protein, carbs, sugar, fat, saturatedFat, fiber }) => {
  return (
    <div>

      <Table striped className='caption-top'>
        <caption>{name}</caption>
        <thead>
          <tr>
            <th>Nutritional value for</th>
            <th>100 grams</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calories</td>
            <td>{calories} kcal</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{protein} grams</td>
          </tr>
          <tr>
            <td>Carbs</td>
            <td>{carbs} grams</td>
          </tr>
          <tr>
            <td>Sugar</td>
            <td>{sugar} grams</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{fat} grams</td>
          </tr>
          <tr>
            <td>Saturated fat</td>
            <td>{saturatedFat} grams</td>
          </tr>
          <tr>
            <td>Fiber</td>
            <td>{fiber} grams</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default FoodInfo