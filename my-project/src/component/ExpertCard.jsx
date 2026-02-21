import { Link } from "react-router-dom";

function ExpertCard({ expert }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold">{expert.name}</h3>
      <p className="text-indigo-600">{expert.category}</p>
      <p className="text-sm text-gray-600 mt-2">
        Experience: {expert.experience} yrs
      </p>
      <p className="text-yellow-500 font-semibold">
        ⭐ {expert.rating}
      </p>

      <Link to={`/expert/${expert._id}`}>
        <button className="mt-4 bg-indigo-600 text-white w-full py-2 rounded-lg">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ExpertCard;