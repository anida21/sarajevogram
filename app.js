require("dotenv").config();

const express = require("express");
const app = express();
const path = require('path')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/frontend/dist')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/dist/index.html'))
})

const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

const { Post } = require("./db/models/post.model");

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

/* MIDDLEWARE  */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

/* END MIDDLEWARE  */

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

module.exports = app;

//app.listen(process.env.PORT || 3000, () => {
  //console.log("Server is listening on port 3000");
//});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log("Express server listening on port ", PORT);
});
