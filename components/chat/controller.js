const store = require("./store");

function addChat(users) {
  if (!users || !Array.isArray(users)) {
    console.error("No user or message found");
    return Promise.reject("The data is wrong");
  }

  const chat = {
    users: users,
  };

  return store.add(chat);
}

function listChats(userId) {
  return store.list(userId);
}

module.exports = {
  addChat,
  listChats,
};
