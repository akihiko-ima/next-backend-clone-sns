const cors = require("cors")
const express = require("express");
require("dotenv").config();

const authRoute = require("./routers/auth")
const postsRoute = require("./routers/posts")
const usersRoute = require("./routers/users")


const app = express();
const PORT = 5000;
app.use(cors())
app.use(express.json());

// router
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
