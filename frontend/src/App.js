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

  const displayInfo = (id) => {
    setFoodInfo(data.find(item => item.id === id))
  }

  const getFood = (food) => {
    fetch(`http://localhost:3001/${food}`)
      .then(res => res.json())
      //data.data[0] because the response is an array with one object in it
      .then(data => {
        setFoodInfo(data.data[0])
        setFoodSearch('')
        setQuantity('')
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
        <p className='mb-0'>Quantity</p>
        <input type='text' 
               className='mb-1 p-1'
               value={quantity}
               onChange={(e) => setQuantity(e.target.value)}        
        />
        <Button variant='dark' 
                className='app_searchButton m-auto mb-2'
                onClick={(food) => getFood(foodSearch)}
        >Search
        </Button>
      </div>
      
      <div className='d-flex'>
        <div className='d-flex flex-column app_div_buttons'>
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
        <div className='flex-fill app_div_foodInfo'>
          {
            foodInfo ?
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
              :
              null
          }
        </div>
      </div> 
    </>
    
  );
}

export default App;
