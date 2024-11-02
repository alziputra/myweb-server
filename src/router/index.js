const route = require("express").Router();
const usersRoute = require("./userRoute");
const portfolioRouter = require("./portfolioRoute");

route.get("/", (req, res) => {
  res.json({
    message: "welcome to our API",
  });
});

route.use("/users", usersRoute);
route.use("/portfolios", portfolioRouter);

module.exports = route;
