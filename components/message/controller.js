const store = require("./store");

function addMessage(user, message) {
  // console.log(user);
  // console.log(message);
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[messageController] No hay usuario o mensaje");
      reject("Los datos son incorrectos");
      return false;
    }

    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    };

    store.add(fullMessage);
    resolve(fullMessage);
    // console.log(fullMessage);
  });
}

function getMessages() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function updateMessages(id, message) {
  return new Promise(async (resolve, reject) => {
    // console.log(id, message);

    if (!id || !message) {
      reject("Invalid data");
      return false;
    }

    const result = await store.updateText(id, message);
    resolve(result);
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessages,
};
