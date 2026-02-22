import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import socket from "../socketio/Socket";

function ExpertsDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    // Fetch expert details
    API.get(`/experts/${id}`).then((res) => {
      setExpert(res.data);
    });

    // Listen for real-time slot updates
    const handleSlotBooked = (data) => {
      if (data.expert === id) {
        setExpert((prev) => {
          if (!prev) return prev;
          const updatedSlots = prev.availableSlots.map((dateObj) => {
            if (dateObj.date === data.date) {
              return {
                ...dateObj,
                slots: dateObj.slots.filter((slot) => slot !== data.timeSlot),
              };
            }
            return dateObj;
          });
          return { ...prev, availableSlots: updatedSlots };
        });
      }
    };

    socket.on("slotBooked", handleSlotBooked);

    return () => socket.off("slotBooked", handleSlotBooked);
  }, [id]);

  if (!expert) return <p className="text-center mt-10">Loading expert details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Expert Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-3xl font-bold mb-2">{expert.name}</h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Category:</span> {expert.category}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Experience:</span> {expert.experience} years
        </p>
        <p className="text-gray-600">{expert.description}</p>
      </div>

      {/* Available Slots */}
      <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
      <div className="space-y-4">
        {expert.availableSlots.length === 0 && (
          <p className="text-gray-500">No slots available.</p>
        )}
        {expert.availableSlots.map((dateObj) => (
          <div key={dateObj.date} className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-lg font-medium mb-2">{dateObj.date}</h4>
            <div className="flex flex-wrap gap-3">
              {dateObj.slots.length === 0 ? (
                <button
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                >
                  No Slots
                </button>
              ) : (
                dateObj.slots.map((slot) => (
                  <Link
                    key={slot}
                    to={`/booking/${expert._id}`}
                    state={{ date: dateObj.date, slot }}
                  >
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
                      {slot}
                    </button>
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpertsDetail;