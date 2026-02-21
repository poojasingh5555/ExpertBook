import { Link, NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaUserTie className="text-yellow-300 text-3xl" />
          <span className="tracking-wide">ExpertBook</span>
        </Link>

        {/* Links */}
        <div className="space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white pb-1"
                : "hover:text-gray-200"
            }
          >
            Experts
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white pb-1"
                : "hover:text-gray-200"
            }
          >
            My Bookings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;