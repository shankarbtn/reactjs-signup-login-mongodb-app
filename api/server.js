const express = require("express");
const app = express();
//const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const routeUrls = require("../api/routes/routes");
const cookieParser = require("cookie-parser");
//dotenv.config();

//connect to MongoDB
const MGDB_URL = "mongodb+srv://reactjs-signup-db-user:0OTV5at7HY9McIck@cluster0.czbmb.mongodb.net/user_signup_db?retryWrites=true&w=majority";
mongoose.connect(MGDB_URL,
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
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));


//API Model routers
app.use("/APIROUTE", routeUrls);

app.use("/", (req, res) => {
    res.send('Welcome to server');
});

// use port 4000 unless there exists a preconfigured port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`API Server started listening ${port}...`);
});
