const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.headers);

  res.header({
    "custom-header": "Nuestro valor personalizado",
  });
  response.success(req, res, "Lista de mensajes |GET");

  // res.send("Lista de mensajes GET");
});

router.post("/", (req, res) => {
  // console.log(req.query);

  controller
    .addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Información inválida",
        400,
        "Error en el controlador"
      );
    });

  // console.log(req.body);
});

router.delete("/", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  response.success(req, res, "Eliminado correctamente |DELETE");

  // res.send("¡Hola! " + req.body.text + " esta es una respuesta desde DELETE");
});

module.exports = router;
