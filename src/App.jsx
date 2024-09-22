import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Inbox from "./pages/Inbox";
import EmailDetail from "./pages/EmailDetail";
import Sent from "./pages/Sent";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const token = useSelector(state => state.auth.token);

  return (
    <>
      {token && (location.pathname !== "/signup" && location.pathname !== "/login") && <Sidebar />}
      <Routes>
        {!token && (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {token && (
          <>
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/inbox/:emailId" element={<EmailDetail />} />
            <Route path="/sent/:emailId" element={<EmailDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
