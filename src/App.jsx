import { Route, Routes, useLocation } from "react-router-dom"
import Signup from './pages/Signup'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import Inbox from "./pages/Inbox"
import EmailDetail from "./pages/EmailDetail"
import Sent from "./pages/Sent"

function App() {
  const location = useLocation();

  return (
    <>
      {(location.pathname !== "/signup" && location.pathname !== "/login") && <Sidebar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inbox" element={<Inbox />}/>
        <Route path="/sent" element={<Sent />} />
        <Route path="/inbox/:emailId" element={<EmailDetail />} />
        <Route path="/sent/:emailId" element={<EmailDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Home</div>} />
      </Routes>
    </>
  )
}

export default App
