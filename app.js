require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const indexRoute = require("./routes/index");

const app = express();

// app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1", indexRoute);

app.listen(
    process.env.PORT ||
    5000, () => console.log(`run in port ${process.env.PORT}`))
