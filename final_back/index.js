require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/propertyRoutes");
const fs = require("fs");
connection();
mongoose.set("strictQuery", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/userRoutes"));
app.use("/booking", require("./routes/bookingRoute"));
app.use("/new", require("./routes/newRoutes"));
app.use("/property", productRoute);
app.use("/agent", require("./routes/agentRoutes"));
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
