const socket = require("../../socket").socket;
const store = require("./store");

function addMessage(user, message, chat, file) {
  if (!user || !message || !chat) {
    console.error("No user or message found");
    return Promise.reject("The data is wrong");
  }

  let fileUrl = "";
  if (file) {
    fileUrl = "http://localhost:8080/app/files/" + file.filename;
  }

  const fullMessage = {
    user: user,
    message: message,
    chat: chat,
    date: new Date(),
    file: fileUrl,
  };

  socket.io.emit("message", fullMessage);
  return store.add(fullMessage);
}

// function getMessages(filterByUser) {
//   return store.list(filterByUser);
// }

function getMessages(filterChat) {
  return store.list(filterChat);
}

function updateMessage(id, message) {
  if (!id || !message) {
    return Promise.reject("No id or message found");
  }

  return store.update(id, message);
}

function deleteMessage(id) {
  if (!id) {
    return Promise.reject("Id not found");
  }

  return store.remove(id);
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
