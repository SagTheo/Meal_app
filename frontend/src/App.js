import { Routes, Route } from 'react-router-dom'
import FoodSearchPublic from './screen/FoodSearchPublic';
import Login from './screen/Login';
import Signup from './screen/Signup';
import UserDashboard from './screen/UserDashboard';
import NotFound from './screen/NotFound';
import Protected from './components/Protected';

function App() {
  const token = localStorage.getItem('userToken')

  return (
    <Routes>
      <Route path="/" element={<FoodSearchPublic />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={
        <Protected token={token}>
          <UserDashboard />
        </Protected>
      } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
