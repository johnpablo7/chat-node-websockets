// Importamos la librería express
const express = require("express");

// Creamos una instancia de express
const app = express();

// Especificamos un puerto en una variable
const port = process.env.PORT || 3000;

// Definimos una ruta "/" que responde con un string
app.use("/", (req, res) => {
  res.send("¡Hola!, esta es una respuesta por defecto del servidor!");
});

// Iniciamos el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor conectado, escuchando el puerto ${port}`);
});
