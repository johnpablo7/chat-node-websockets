exports.success = (req, res, message, status) => {
  res.status(status || 200).send({ error: "", body: message });
};

exports.error = (req, res, message, status, details) => {
  console.error(
    `${new Date()}: Ha ocurrido un nuevo error, detalle: ${details}`
  );

  res.status(status || 500).send({ error: message, body: "" });
};
