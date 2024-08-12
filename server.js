const cors = require("cors")
const express = require("express");
require("dotenv").config();

const authRoute = require("./routers/auth")
const postsRoute = require("./routers/posts")
const usersRoute = require("./routers/users")


const app = express();
const PORT = 5000;
app.use(express.json());

// cors setting
const corsOptions = {
  origin: process.env.CORS_WHITELIST,
  optionsSuccessStatus: 200
}

// renderでの起動用dummy endpoint
app.get('/dummy', cors(), (req, res) => {
  res.send('Hello World!');
});

// router
app.use("/api/auth", cors(corsOptions), authRoute);
app.use("/api/posts", cors(corsOptions), postsRoute);
app.use("/api/users", cors(corsOptions), usersRoute);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
