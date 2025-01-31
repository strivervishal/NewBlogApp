import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      image: Yup.string()
        .url("Invalid image URL") // Ensures valid URL
        .required("Image is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      await axios.post("http://localhost:5000/api/posts", values);
      navigate("/");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        {...formik.getFieldProps("title")}
        className="block border p-2 w-full mb-2"
      />
      {formik.touched.title && formik.errors.title && (
        <p className="text-red-500">{formik.errors.title}</p>
      )}

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        {...formik.getFieldProps("image")}
        className="block border p-2 w-full mb-2"
      />
      {formik.touched.image && formik.errors.image && (
        <p className="text-red-500">{formik.errors.image}</p>
      )}

      <textarea
        name="description"
        placeholder="Description"
        {...formik.getFieldProps("description")}
        className="block border p-2 w-full mb-2"
      />
      {formik.touched.description && formik.errors.description && (
        <p className="text-red-500">{formik.errors.description}</p>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2">
        Add Post
      </button>
    </form>
  );
}

export default AddPost;
