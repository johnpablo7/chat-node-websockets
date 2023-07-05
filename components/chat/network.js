const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.post("/", (req, res) => {
  controller
    .addChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      response.error(req, res, "Invalid information", 400, error);
    });
});

router.get("/:userId", async (req, res) => {
  const filterChats = req.params.userId;

  try {
    const chatList = await controller.listChats(filterChats);
    response.success(req, res, chatList, 200);
  } catch (error) {
    response.error(req, res, "Unexpected Error: ", 400, error);
  }
});

module.exports = router;
