import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch('/')
      .then(res => res.json())
      .then(data => console.log(data.message))
  }, [])

  return (
    <div className="App">
      { !data ? 'Loading...' : data }
    </div>
  );
}

export default App;
