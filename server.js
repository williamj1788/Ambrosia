const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRouter = require("./users/userRouter");
const adminRouter = require("./products/adminRouter");
const app = express();

const url = require("./config").url;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch(console.log);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(allowCrossDomain);

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(express.static(path.join(__dirname, "build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

function allowCrossDomain(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  next();
}
