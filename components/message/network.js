const express = require("express");
const multer = require("multer");

const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

const upload = multer({
  dest: "public/files/",
});

router.get("/", async (req, res) => {
  // console.log(req.headers);
  // res.header({
  //   "custom-header": "Nuestro valor personalizado",
  // });
  // response.success(req, res, "Lista de mensajes |GET");
  // res.send("Lista de mensajes GET");

  const filterMessages = req.query.user || null;

  try {
    const messageList = await controller.getMessages(filterMessages);
    response.success(req, res, messageList, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error: ", 400, error);
  }
});

router.post("/", upload.single("file"), (req, res) => {
  // console.log(req.file);

  controller
    .addMessage(req.body.user, req.body.message, req.body.chat, req?.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((error) => {
      response.error(req, res, "Invalid information", 400, error);
    });
});

router.patch("/:id", async (req, res) => {
  // console.log(req.params.id);
  await controller
    .updateMessage(req.params.id, req.body.message)
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
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Message ${req.params.id} removed`, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 400, e);
    });
});

module.exports = router;
