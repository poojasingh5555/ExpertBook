import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Experts from "./pages/Experts";
import ExpertDetail from "./pages/ExpertsDetail";
import Booking from "./pages/Bookings";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Experts />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;