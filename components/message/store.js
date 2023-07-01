const Model = require("./model");

// const list = [];

function addMessage(message) {
  // list.push(message);
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages() {
  // return list;
  const messages = await Model.find();
  return messages;
}

async function updateText(id, message) {
  const updatedMessage = await Model.findByIdAndUpdate(
    id,
    { message },
    { new: true }
  );
  return updatedMessage;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText,
};
