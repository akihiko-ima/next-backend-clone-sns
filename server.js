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
const whitelist = process.env.CORS_WHITELIST;

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === whitelist) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// renderでの起動用dummy endpoint
app.get('/dummy', cors(), (req, res) => {
  res.send('Hello World!');
});

// router
app.use("/api/auth", cors(corsOptions), authRoute);
app.use("/api/posts", cors(corsOptions), postsRoute);
app.use("/api/users", cors(corsOptions), usersRoute);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
