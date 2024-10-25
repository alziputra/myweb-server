const route = require("express").Router();
const usersRoute = require("./userRoute");

route.get("/", (req, res) => {
  res.json({
    message: "welcome to our API",
  });
});

route.use("/users", usersRoute);

module.exports = route;
