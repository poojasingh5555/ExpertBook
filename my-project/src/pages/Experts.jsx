import { useEffect, useState } from "react";
import API from "../api/axios";
import ExpertCard from "../component/ExpertCard";
import Pagination from "../component/Pagination";
import Loader from "../component/Loader";

function Experts() {
  const [experts, setExperts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Fetch experts from backend
  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/experts", {
        params: {
          page,
          search: search.trim() || undefined,
          category: category.trim() || undefined, // filter by category
        },
      });

      setExperts(data.experts || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.log("Error fetching experts:", err);
      setError(err.response?.data?.message || "Failed to load experts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page, search, or category changes
  useEffect(() => {
    fetchExperts();
  }, [page, search, category]);

  // Reset page to 1 when search or category changes
  useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Find Experts</h2>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by category"
          className="border p-2 rounded w-full md:w-64"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Empty State */}
      {!loading && experts.length === 0 && !error && (
        <p className="text-gray-500 text-center mt-10">
          {category
            ? `No experts found in category "${category}".`
            : search
            ? `No experts found for "${search}".`
            : "No experts found."}
        </p>
      )}

      {/* Experts Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <ExpertCard key={expert._id} expert={expert} />
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <Pagination page={page} pages={pages} setPage={setPage} />
      )}
    </div>
  );
}

export default Experts;