import { Routes, Route } from 'react-router-dom'
import FoodSearchPublic from './screen/FoodSearchPublic';
import Login from './screen/Login';
import Signup from './screen/Signup';
import UserDashboard from './screen/UserDashboard';
import NotFound from './screen/NotFound';
import Protected from './components/Protected';
import NewMeal from './screen/NewMeal'
import MyMeals from './screen/MyMeals'

function App() {
  // const token = localStorage.getItem('userToken')

  return (
    <Routes>
      <Route path="/" element={<FoodSearchPublic />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={
        <Protected token={localStorage.getItem('userToken')}>
          <UserDashboard />
        </Protected>
      } 
      />
      <Route path="/new-meal" element= {
        <Protected token={localStorage.getItem('userToken')}>
          <NewMeal />
        </Protected>
      } 
      />
      <Route path="/my-meals" element= {
        <Protected token={localStorage.getItem('userToken')}>
          <MyMeals />
        </Protected>
      } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
