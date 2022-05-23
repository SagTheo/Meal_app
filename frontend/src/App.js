import { Routes, Route } from 'react-router-dom'
import FoodSearchPublic from './screen/FoodSearchPublic';
import Login from './screen/Login';
import Signup from './screen/Signup';
import UserDashboard from './screen/UserDashboard';
import NotFound from './screen/NotFound';
import Protected from './components/Protected';
import NewMeal from './screen/NewMeal'
import MyMeals from './screen/MyMeals'
import { UserProvider, UserContext } from './context/user-context';
import { useContext } from 'react'

function App() {
  const token = useContext(UserContext)

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<FoodSearchPublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <Protected token={token ?? null}>
            <UserDashboard />
          </Protected>
        } 
        />
        <Route path="/new-meal" element= {
          <Protected token={token ?? null}>
            <NewMeal />
          </Protected>
        } 
        />
        <Route path="/my-meals" element= {
          <Protected token={token ?? null}>
            <MyMeals />
          </Protected>
        } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
    
  )
}

export default App;
