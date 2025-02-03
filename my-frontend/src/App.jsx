import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./pages/PostList";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // Store search term

  return (
    <>
      <Navbar onSearch={setSearchTerm} /> {/* Search Term from Navbar */}
      <Routes>
        <Route path="/" element={<PostList searchTerm={searchTerm} />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/view-post/:id" element={<ViewPost />} />
      </Routes>
    </>
  );
}

export default App;
