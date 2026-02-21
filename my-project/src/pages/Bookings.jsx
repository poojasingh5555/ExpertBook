import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../api/axios";

function Booking() {
  const { id } = useParams(); // expert ID
  const location = useLocation();
  const { date, slot } = location.state || {};
 

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
    
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await API.post("/bookings", {
        expert: id,
        ...form,
        date,
        timeSlot: slot,
      });

      setMessage("Booking successful!");
      setForm({ name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage(err.response.data.message || "Slot already booked");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Book Slot</h2>
        <p className="text-center mb-4">
          Booking for <strong>{date}</strong> at <strong>{slot}</strong>
        </p>

        {/* Name */}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
       
        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          className={`bg-indigo-600 text-white w-full py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Booking;
