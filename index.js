require("dotenv").config();

// appel express
const express = require('express');
const app = express();
//définition des Routes
const userRouter = require("./api/users/users.router");
const groupsRouter = require("./api/groups/groups.router");

//pour post json
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/groups", groupsRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT : ", process.env.APP_PORT);
})
