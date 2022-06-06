import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/FoodSearch.css'
import Navbar from '../components/Navbar'

const NewMeal = () => {
    const [foodSearch, setFoodSearch] = useState('')
    const [matches, setMatches] = useState()
    const [invalidSearch, setInvalidSearch] = useState('')
    const [meal, setMeal] = useState([])
  
  
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

    const addToMeal = (food) => {
      setMeal([...meal, food])
    }

    const removeFromMeal = (food) => {
      setMeal(meal.filter(meal => meal.id !== food.id))
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
          <div className='p-1 w-25'>
            {
              meal.length > 0 ?
                  meal.map(item => {
                    return (
                      <div key={item.id} className='d-flex mb-1 justify-content-between'>
                        <p>{item.name[0].toUpperCase() + item.name.slice(1)}</p>
                        <input type='text' 
                               placeholder='Quantity' 
                               className='ms-1 w-50 h-25 p-1' 
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="currentColor" 
                              className="bi bi-trash" 
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
            <Button className='mt-1' disabled>
              Save meal
            </Button>
          </div>
            {
                matches ?
                  <div className='d-flex flex-column'>
                    <p>Here are possible matches for your search:</p>
                    {
                      matches.map(match => {
                        return  <Button 
                                  key={match.id}
                                  onClick={() => addToMeal({'id': match.id, 'name': match.name})}
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
          <div className='p-1 w-25'>
            <p>Nutritional values for your meal</p>
          </div>
        </div> 
      </>
      
    );
}

export default NewMeal