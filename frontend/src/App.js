import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import FoodInfo from './components/FoodInfo.js'

function App() {
  const [data, setData] = useState()
  const [foodInfo, setFoodInfo] = useState()
  const [foodSearch, setFoodSearch] = useState('')
  const [quantity, setQuantity] = useState('')
  const [matches, setMatches] = useState()
  const [invalidSearch, setInvalidSearch] = useState('')

  const displayInfo = (id) => {
    setFoodInfo(data.find(item => item.id === id))
  }

  const getFood = (food) => {
    //Return here because if user hasn't entered anything in the food field,
    //function will fetch to http://localhost:3001/'' equivalent to http://localhost:3001 
    //and therefore the request will be caught on the serverside by the handler 
    //for the '/' route, not the one for the '/:food' route
    if (food === '') return

    fetch(`http://localhost:3001/${food}`)
      .then(res => res.json())
      //data.data[0] because the response is an array with one object in it
      .then(data => {
        if (data.data.length === 0) {
          setFoodInfo('')
          setMatches(null)
          setInvalidSearch('No results found')
        } else if (data.data.length > 1) {
          setFoodInfo('')
          setMatches(data.data)
        } else {
          setFoodInfo(data.data[0])
          setFoodSearch('')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
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
        <div className='d-flex flex-column app_div_buttons'>
          <p className='m-1 ps-4 border-bottom border-secondary'>Quick search</p>
          {/* For the quick search */}
          { !data ? 
                'Loading...' 
                : 
                data.map(item => (
                    <Button key={item.id} 
                            className='m-1'
                            onClick={() => displayInfo(item.id)}
                    >
                      {item.name[0].toUpperCase() + item.name.slice(1)}
                    </Button>
                  )
                ) 
          }
        </div>
        <div className='d-flex flex-fill justify-content-center align-items-center'>
          {
            //Checks if we have details of a food to display
            foodInfo ?
              <div className='d-flex align-items-center'>
                <FoodInfo
                  name={foodInfo.name}
                  calories={foodInfo.calories}
                  protein={foodInfo.protein}
                  carbs={foodInfo.carbs}
                  sugar={foodInfo.sugar}
                  fat={foodInfo.fat}
                  saturatedFat={foodInfo.saturatedFat}
                  fiber={foodInfo.fiber} 
                  quantity={quantity === '' ? 100 : parseInt(quantity)}
                />
                <div className='ms-4'>
                  <p className='mb-0 text-center'>Quantity</p>
                  <input type='text' 
                        className='p-1'
                        value={quantity}
                        //onChange event changes value of 'quantity' dynamically
                        //therefore if 'foodInfo' is not empty, it will be re-rendered everytime
                        //this onChange event fires, changing the quantities displayed in the 
                        //'foodInfo' component dynamically as well
                        onChange={(e) => setQuantity(e.target.value)}        
                  />
                </div>
              </div>
              :
              //If after user search, we have several possible matches:
              //On click of one of the buttons rendered, will call same function called 
              //after clicking on Search button
              matches ?
                <div className='d-flex flex-column'>
                  <p>Here are possible matches for your search:</p>
                  {
                    matches.map(match => {
                      return  <Button 
                                key={match.id}
                                onClick={() => getFood(match.name)}
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

export default App;
