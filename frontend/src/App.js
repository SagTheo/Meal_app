import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import FoodInfo from './components/FoodInfo.js'

function App() {
  const [data, setData] = useState()
  const [foodInfo, setFoodInfo] = useState({})

  const displayInfo = (id) => {
    setFoodInfo(data.find(item => item.id === id))
  }

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
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
          />
          :
          null
      }
    </div> 
  );
}

export default App;
