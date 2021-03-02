const routes = require("express").Router();

const auth = require("./src/middlewares/auth");

const courseController = require("./src/controllers/courseController");
const authController = require("./src/controllers/authController");

routes.post("/register", authController.register);
routes.post("/authenticate", authController.authenticate);

routes.get("/courses", auth, courseController.index);
routes.get("/course/:id", auth, courseController.show);
routes.post("/course", auth, courseController.store);
routes.put("/course/:id", auth, courseController.update);
routes.delete("/course/:id", auth, courseController.destroy);
routes.get("/search", auth, courseController.search);

module.exports = routes;
