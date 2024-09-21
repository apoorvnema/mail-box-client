import { Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'

function App() {

  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="*" element={<div>Home</div>}/>
    </Routes>
  )
}

export default App
