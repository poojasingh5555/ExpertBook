import { useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await API.get("/bookings", {
      params: { email }
    });
    setBookings(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={fetchBookings}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {bookings.map((b) => (
        <div
          key={b._id}
          className="bg-white shadow p-4 rounded mb-4"
        >
          <h4 className="font-semibold">{b.expert.name}</h4>
          <p>{b.date} - {b.timeSlot}</p>
          <span className="px-3 py-1 bg-green-500 text-white rounded">
            {b.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;