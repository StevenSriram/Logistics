const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({});

// mongooose model
const UserModal = require("./modals/UserModal");

// router
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const vehicleRouter = require("./routes/vehicleRouter");

const app = express();

// JSON response
app.use(express.json());
// cookieParser for http-only-cookie
app.use(cookieParser());
// Cross Origin Resource Sharing
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// routes handler
app.use("/api", userRouter);
app.use("/admin", adminRouter);
app.use("/vehicle", vehicleRouter);

// Static files for uploads
app.use("/uploads", express.static("uploads"));

// Mongo DataBase Connection
const url =
  "mongodb+srv://suriyaes:12345@logic.xhtqo.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(() => console.error("Error Occured"));

// ! React App
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "/../FrontEnd/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "FrontEnd", "dist", "index.html")
    );
  });
}
// ! React App END

// listen to port
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  console.log(`Server started at http://localhost:${port}`);
});
