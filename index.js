const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./passport");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const getRoute = require("./routes/get");
const deleteRoute = require("./routes/delete");
const path = require("path");
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.COOKIE_SESSION_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {
            // sameSite: "none",
            // secure: true,
            maxAge: 1000 * 60 * 60 * 12,
        },
    })
);
app.use(express.static(path.join(__dirname, "static")));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/get", getRoute);
app.use("/delete", deleteRoute);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.listen(3001, () => {
    console.log(`App running`);
});