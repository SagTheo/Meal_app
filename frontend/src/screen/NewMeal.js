import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'
import Navbar from '../components/Navbar'

const NewMeal = () => {
    const [foodSearch, setFoodSearch] = useState('')
    const [matches, setMatches] = useState()
    const [invalidSearch, setInvalidSearch] = useState('')
    const [meal, setMeal] = useState([])
    const [calories, setCalories] = useState(0)
    const [protein, setProtein] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [sugar, setSugar] = useState(0)
    const [fat, setFat] = useState(0)
    const [saturatedFat, setSaturatedFat] = useState(0)
    const [fiber, setFiber] = useState(0)

    // For the modal
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
  
  
    const getFood = (food) => {
      //Return here because if user hasn't entered anything in the food field,
      //function will fetch to http://localhost:3001/'' equivalent to http://localhost:3001 
      //and therefore the request will be caught on the serverside by the handler 
      //for the '/' route, not the one for the '/:food' route
      if (food === '') return
  
      fetch(`http://localhost:3001/${food}`)
        .then(res => res.json())
        .then(data => {
          if (data.data.length === 0) {
            setMatches(null)
            setInvalidSearch('No results found')
          } else {
            setMatches(data.data)
          }
        })
        .catch(err => console.log(err))
    }

    //Adds details of a food to array 'meal', so it can be added to meal list
    const addToMeal = (food) => {
      setMeal([...meal, {...food, quantity: null}])
    }

    //Removes food from meal list 
    const removeFromMeal = (food) => {
      setMeal(meal.filter(meal => meal.id !== food.id))
    }

    //Calculates the total amount of 'value' for the meal
    const total = (array) => {
      const values = ['calories', 'protein', 'carbs', 'sugar', 'fat', 'saturatedFat', 'fiber']

      values.forEach(value => {
        const current = array.reduce((acc, curr) => acc + (curr.quantity / 100 * JSON.parse(curr[value])), 0)

        switch (value) {
          case 'calories':
            setCalories(Math.floor(current * 10) / 10)
            break
          case 'protein':
            setProtein(Math.floor(current * 10) / 10)
            break
          case 'carbs':
            setCarbs(Math.floor(current * 10) / 10)
            break
          case 'sugar':
            setSugar(Math.floor(current * 10) / 10)
            break
          case 'fat':
            setFat(Math.floor(current * 10) / 10)
            break
          case 'saturatedFat':
            setSaturatedFat(Math.floor(current * 10) / 10)
            break
          case 'fiber':
            setFiber(Math.floor(current * 10) / 10)
            break
          default:
            console.log('Error in the switch case')
        }
      })
    }

    const saveMeal = () => {
      fetch('http://localhost:3001/saveMeal', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('userToken'),
          mealFoods: meal,
          calories: calories,
          protein: protein, 
          carbs: carbs,
          sugar: sugar,
          fat: fat,
          saturatedFat: saturatedFat,
          fiber: fiber
        })
      })
        .then(res => res.json())
        .then(response => {
          if (response.response === 'OK') {
            navigate('/my-meals')
          } else {
            console.log('Couldn\'t save meal')
          }
        })
        .catch(err => console.log(err))
      
    }
  
    return (
      <>    
        <Navbar /> 

        <div className='d-flex flex-column text-center w-25 m-auto'>
          <p className='mb-0'>Search a food</p>
          <input type='text' 
                 className='mb-1 p-1'
                 value={foodSearch}
                 onChange={(e) => setFoodSearch(e.target.value)}        
          />
          <Button variant='dark' 
                  className='app_searchButton m-auto mb-2'
                  onClick={() => getFood(foodSearch)}
          >Search
          </Button>
        </div>
        
        <div className='d-flex justify-content-between'>
          {/* Meal list */}
          <div className='p-1 w-25'>
            <p>Once you have added a food to your meal (or removed one), and the quantity for it, 
              click on Update meal to see the total 
              nutritional values for that meal.
              Once you are happy with your meal, click on Save meal
            </p>
            {
              meal.length > 0 ?
                  meal.map(item => {
                    return (
                      <div key={item.id} className='d-flex mb-1 justify-content-between align-items-center'>
                        <p className='mb-1'>{item.name[0].toUpperCase() + item.name.slice(1)}</p>
                        <input type='text' 
                               placeholder='Quantity' 
                               className='ms-1 w-50 h-25 p-1'
                               //Sets the quantity of the food 
                               onChange={(e) => item.quantity = e.target.value}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="black" 
                              className="bi bi-trash trashcan" 
                              viewBox="0 0 16 16"
                              onClick={() => removeFromMeal(item)}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                      </div>
                    ) 
                  })
                :
                null
            }
            {/* Saves meal composed by user to database */}
            <Button className='mt-1' onClick={() => setShow(true)}>
              Save meal
            </Button>
            {/* Updates the nutritional values for the meal depending on quantity entered 
                for each food composing the meal
            */}
            <Button className='mt-1 ms-1' onClick={() => total(meal)}>
              Update meal
            </Button>
          
          {/* Food search results */}
          </div>
            {
                matches ?
                  <div className='d-flex flex-column'>
                    <p>Here are possible matches for your search:</p>
                    {
                      matches.map(match => {
                        return  <Button 
                                  key={match.id}
                                  onClick={() => addToMeal(match)}
                                  className='mb-1'
                                  variant="link"
                                >
                                  {match.name[0].toUpperCase() + match.name.slice(1)}
                                </Button>
                      })
                    }
                  </div>
                  :
                  //To avoid getting an error
                  <p>{invalidSearch}</p>
            }


          {/* Nutritional values of the meal */}
          <div className='p-1 w-25'>
            <p>Nutritional values for your meal</p>
            <ul>
              <li>Calories: {calories} kcal</li>
              <li>Protein: {protein} grams</li>
              <li>Carbs: {carbs} grams</li>
              <li>Sugar: {sugar} grams</li>
              <li>Fat: {fat} grams</li>
              <li>Saturated fat: {saturatedFat} grams</li>
              <li>Fiber: {fiber} grams</li>
            </ul>
          </div>
        </div> 

        {/* Confirmation modal */}
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to save this meal ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              No
            </Button>
            <Button variant="primary" onClick={() => saveMeal()}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default NewMeal