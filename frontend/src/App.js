import { Routes, Route } from 'react-router-dom'
import FoodSearch from './components/FoodSearch';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodSearch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App;
