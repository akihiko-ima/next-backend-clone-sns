const cors = require("cors")
const express = require("express");
require("dotenv").config();

const authRouter = require("./routers/auth")
const postsRouter = require("./routers/posts")
const usersRouter = require("./routers/users")


const app = express();
const PORT = 5000;
// json形式のデータを受け取るための設定
app.use(express.json());

// cors setting
const whitelist = process.env.CORS_WHITELIST.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

// renderでの起動用dummy endpoint
app.get('/dummy', cors(), (req, res) => {
  res.send('Hello World!');
});

// router
app.use("/api/auth", cors(corsOptions), authRouter);
app.use("/api/posts", cors(corsOptions), postsRouter);
app.use("/api/users", cors(corsOptions), usersRouter);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
