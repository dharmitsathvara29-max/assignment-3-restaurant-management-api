const express = require ("express");
const db = require("./config/db");
const UsersRouter = require("./router/UsersRouter");
const RestaurantRouter = require("./router/RestaurantRouter");
const MenuRouter = require("./router/MenuRouter")

const app = express();
app.use(express.json());

app.use("/Users", UsersRouter);
app.use("/restaurants", RestaurantRouter);
app.use("/menu", MenuRouter)

app.listen(4000, () =>{
    console.log("Server is running on pport 4000")
})