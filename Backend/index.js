require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const FeedbackRoutes = require("./Routes/Feedback");
const PrivateFeedback = require("./Routes/PrivateFeedback");
const ClassRoutes = require("./Routes/Class");
const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/authenticator");
const ServicesRoutes = require("./Routes/service");
// const PlanRoutes = require("./Routes/plan");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/register", userRoutes);
app.use("/auth", authRoutes);
app.use("/comentarios", FeedbackRoutes);
app.use("/privatefeedback", PrivateFeedback);
app.use("/class", ClassRoutes);
app.use("/service", ServicesRoutes);
// app.use("/plan", PlanRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));