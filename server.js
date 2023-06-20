const express = require("express");
const response = require("./network/response");

const router = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const port = process.env.PORT || 3000;

// app.use("/", (req, res) => {
//   res.send("¡Hola!, esta es una respuesta por defecto del servidor!");
// });

router.get("/message", (req, res) => {
  console.log(req.headers);

  res.header({
    "custom-header": "Nuestro valor personalizado",
  });

  response.success(req, res, "Lista de mensajes |GET");

  // res.send("Lista de mensajes GET");
});

router.post("/message", (req, res) => {
  console.log(req.query);

  if (req.query.error == "ok") {
    response.error(req, res, "Error simulado", 400);
  } else {
    response.success(req, res, "Creado correctamente |POST", 201);
  }

  // console.log(req.body);
});

router.delete("/message", (req, res) => {
  console.log(req.query);
  console.log(req.body);

  response.success(req, res, "Eliminado correctamente |DELETE");

  // res.send("¡Hola! " + req.body.text + " esta es una respuesta desde DELETE");
});

app.use("/app", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Servidor conectado, escuchando el puerto ${port}`);
});
