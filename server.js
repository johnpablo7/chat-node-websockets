require("dotenv").config();
const express = require("express");
const router = require("./network/routes");
const dbConnection = require("./config/db");
const app = express();

// socket.io
const server = require("http").Server(app);
const socket = require("./socket");

// cors
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// socket.io
socket.connect(server);

// cors
app.use(cors());

// app.use(router);
router(app);

const port = process.env.PORT || 3000;

// app.use("/", (req, res) => {
//   res.send("¡Hola!, esta es una respuesta por defecto del servidor!");
// });

app.use("/app", express.static(__dirname + "/public"));
// app.use("/uploads", express.static(__dirname + "/uploads"));

async function main() {
  await dbConnection();
  server.listen(port, () => {
    console.log(`Server connected, listening on port ${port}`);
  });
}

main();
