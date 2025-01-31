import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-bold">
        BlogApp
      </Link>

      {/* Center: Search Bar */}
      <div className="relative flex-1 max-w-lg mx-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 pl-10 pr-4 rounded w-full bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Right: Add Post & Post List */}
      <div className="space-x-4">
        <Link
          to="/add-post"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Post
        </Link>
        <Link
          to="/"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Post List
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
