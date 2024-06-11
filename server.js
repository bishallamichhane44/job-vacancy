// Import all packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { success, error } = require("consola");
const passport = require("passport");
const path = require("path");
const methodOverride = require("method-override");
const { jwtPassport } = require("./Middlewares/passport");
const { MONGO_URI } = require("./config");

// Initialize the application
const app = express();

const PORT = process.env.PORT || 8000;
// Packages middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(methodOverride("_method"));
// User Defined Middlewares
jwtPassport(passport);

// Router middleware
app.use("/api/users", require("./Routes/registration"));
app.use("/api/users", require("./Routes/login"));
app.use("/api/profiles", require("./Routes/profile"));
app.use("/api/jobs", require("./Routes/jobPosts"));
app.use("/api/auth", require("./Routes/auth"));

//Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.get("/api/he", (req, res) => {
  res.send("Hello Roshan");
  console.log("hahahaha");
});
const connectandStart = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");

    // Listening to the port
    app.listen(process.env.PORT, () =>
      success({
        message: `Server listening to port ${process.env.PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error({
      message: `Unable to connect to MongoDB atlas \n${err}`,
      badge: true,
    });
    connectandStart();
  }
};

connectandStart();
