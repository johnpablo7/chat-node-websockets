const store = require("./store");

function addMessage(user, message) {
  if (!user || !message) {
    console.error("No user or message found");
    return Promise.reject("The data is wrong");
  }

  const fullMessage = {
    user: user,
    message: message,
    date: new Date(),
  };

  return store.add(fullMessage);
}

function getMessages(filterByUser) {
  return store.list(filterByUser);
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
