require("dotenv").config();
const express = require("express");
const router = require("./network/routes");
const dbConnection = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router(app);
// app.use(router);

const port = process.env.PORT || 3000;

// app.use("/", (req, res) => {
//   res.send("¡Hola!, esta es una respuesta por defecto del servidor!");
// });

app.use("/app", express.static(__dirname + "/public"));

async function main() {
  await dbConnection();
  app.listen(port, () => {
    console.log(`Server connected, listening on port ${port}`);
  });
}

main();
