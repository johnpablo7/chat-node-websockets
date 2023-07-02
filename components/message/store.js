const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  return myMessage.save();
}

async function getMessages(filterByUser) {
  // let filterUser = filterByUser ? { user: new RegExp(filterByUser, "i") } : {};

  let filterUser = {};

  if (filterByUser !== null) {
    filterUser = { user: filterByUser };
  }

  return Model.find(filterUser).populate("user").exec();

  // const messages = await Model.find(filterUser);
  // if (messages.length !== 0) {
  //   return messages;
  // } else {
  //   console.log("User not found in the database");
  //   return "User not found";
  // }
}

async function updateText(id, message) {
  const updatedMessage = await Model.findByIdAndUpdate(
    id,
    { message },
    {
      returnDocument: "after",
    }
  );
  return updatedMessage;
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id,
  });
}

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateText,
  remove: removeMessage,
};
