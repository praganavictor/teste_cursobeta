const routes = require("express").Router();

const courseController = require("./src/controllers/courseController");

routes.get("/courses", courseController.index);
routes.get("/course/:id", courseController.show);
routes.post("/course", courseController.store);
routes.put("/course/:id", courseController.update);
routes.delete("/course/:id", courseController.destroy);

module.exports = routes;
