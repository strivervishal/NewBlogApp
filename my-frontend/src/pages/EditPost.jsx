import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`https://new-blog-app-ten.vercel.app/api/posts/${id}`)
      .then((res) => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://new-blog-app-ten.vercel.app/api/posts/${id}`,
      formData
    );
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="block border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        className="block border p-2 w-full mb-2"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="block border p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-yellow-500 text-white p-2">
        Update Post
      </button>
    </form>
  );
}

export default EditPost;
