const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://new-blog-app-7rnc.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

connectDB();
app.use("/api/posts", require("./routes/postRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
