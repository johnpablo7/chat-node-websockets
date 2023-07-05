const statusMessages = {
  200: "Done",
  201: "Created",
  400: "Invalid format",
  500: "Internal error",
};

exports.success = (req, res, message, status = 200) => {
  // res.status(status || 200).send({ body: message });

  res.status(status).send({
    error: "",
    body: message || statusMessages[status],
  });
};

exports.error = (req, res, message, status = 500, details) => {
  console.error(`${new Date()}: A new error has occurred, detail: ${details}`);

  // res.status(status || 500).send({ error: message, body: "" });

  res.status(status).send({
    error: message || statusMessages[status],
    body: "",
  });
};
