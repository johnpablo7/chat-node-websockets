const Model = require("./model");

function addChat(chat) {
  const myChat = new Model(chat);
  return myChat.save();
}

async function listChats(userId) {
  let filterUser = {};

  if (userId !== null) {
    filterUser = { users: userId };
  }

  return Model.find(filterUser).populate("users").exec();
}

module.exports = {
  add: addChat,
  list: listChats,
};
