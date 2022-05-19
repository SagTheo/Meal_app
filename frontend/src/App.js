import { Routes, Route } from 'react-router-dom'
import FoodSearchPublic from './screen/FoodSearchPublic';
import Login from './screen/Login';
import Signup from './screen/Signup';
import UserDashboard from './screen/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodSearchPublic />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  )
}

export default App;
