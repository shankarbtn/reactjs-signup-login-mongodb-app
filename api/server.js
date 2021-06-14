const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routeUrls = require("../api/routes/routes");

dotenv.config();

mongoose.connect(
    process.env.DATABASE_ACCESS,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => {
        console.log("MongoDB connected...");
    }
);

app.use(express.json());
app.use(cors());
app.use("/api", routeUrls);

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`API Server started listening ${port}...`);
});
