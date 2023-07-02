const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", async (req, res) => {
  const filterName = req.query.name || null;

  try {
    const nameList = await controller.getUsers(filterName);
    response.success(req, res, nameList, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error: ", 400, error);
  }
});

router.post("/", (req, res) => {
  controller
    .addUser(req.body.name)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      response.error(req, res, "Invalid information", 400, error);
    });
});

router.patch("/:id", async (req, res) => {
  await controller
    .updateUser(req.params.id, { name: req.body.name })
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 400, e);
    });
});

router.delete("/:id", async (req, res) => {
  // console.log(req.query);
  // console.log(req.body);
  // res.success(req, res, "Eliminado correctamente |DELETE");
  // res.send("¡Hola! " + req.body.text + " esta es una respuesta desde DELETE");
  await controller
    .deleteUser(req.params.id)
    .then(() => {
      response.success(req, res, `User ${req.params.id} removed`, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 400, e);
    });
});

module.exports = router;
