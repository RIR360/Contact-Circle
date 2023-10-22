// connect to mongodb
require("./lib/database");
// get environment variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");


// server setup
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// use cors
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));


// app router
const router = require("./routes/router");

app.use("/", router);


// 404 page not found 
app.use((req, res, next) => {

  res.status(404).json({
    code: 404,
    message: "error",
    error: "404 page not found"
  });

});

// custom error handler
app.use((err, req, res, next) => {

  // logging to the console
  console.error(err);
  // sending to the API
  let code = err.code || 500;
  res.status(code).json(err);

});

app.listen(port, () => {

  console.log(`Contact Circle WebAPI started at http://localhost:${port}/`);

})
