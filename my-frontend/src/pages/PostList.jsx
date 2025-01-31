import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 6; // Show 6 posts per page
  const pagesVisited = pageNumber * postsPerPage;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayPosts = filteredPosts.slice(
    pagesVisited,
    pagesVisited + postsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">All Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 text-gray-700">{post.description}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/view-post/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                View
              </Link>
              <Link
                to={`/edit-post/${post._id}`}
                className="text-yellow-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
}

export default PostList;
