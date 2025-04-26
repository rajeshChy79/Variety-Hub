const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//  Use express.json() for all other routes
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 8080;
connectDB();
app.listen(PORT, () => {
  console.log(` Server started at port ${PORT}`);
});
