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
        
        <div className='d-flex'>
          <div className='p-1'>
            {
              meal.length > 0 ?
                  meal.map(item => {
                    return (
                      <div className='d-flex mb-1'>
                        <p>{item[0].toUpperCase() + item.slice(1)}</p>
                        <input type='text' 
                               placeholder='Quantity' 
                               className='ms-1 w-25 h-25 p-1' 
                        />
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
          <div className='d-flex flex-fill justify-content-center align-items-center'>
            {
                matches ?
                  <div className='d-flex flex-column'>
                    <p>Here are possible matches for your search:</p>
                    {
                      matches.map(match => {
                        return  <Button 
                                  key={match.id}
                                  onClick={() => addToMeal(match.name)}
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
          </div>
        </div> 
      </>
      
    );
}

export default NewMeal