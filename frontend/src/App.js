import { Routes, Route } from 'react-router-dom'
import FoodSearchPublic from './screen/FoodSearchPublic';
import Login from './screen/Login';
import Signup from './screen/Signup';
import UserDashboard from './screen/UserDashboard';
import NotFound from './screen/NotFound';
import NewMeal from './screen/NewMeal'
import MyMeals from './screen/MyMeals'

function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodSearchPublic />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<UserDashboard />} />
      <Route path="/new-meal" element= {<NewMeal />} />
      <Route path="/my-meals" element= {<MyMeals />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
