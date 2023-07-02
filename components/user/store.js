const UserModel = require("./model");

function addUser(user) {
  const myUser = new UserModel(user);
  return myUser.save();
}

async function getUsers(filterByName) {
  let filterUser = filterByName ? { name: new RegExp(filterByName, "i") } : {};
  const name = await UserModel.find(filterUser);

  if (name.length !== 0) {
    return name;
  } else {
    console.log("Username not found in the database");
    return "Name not found";
  }
}

async function updateName(id, changes) {
  console.log(id, changes);
  const updatedNameUser = await UserModel.findByIdAndUpdate(id, changes, {
    returnDocument: "after",
  });
  return updatedNameUser;
}

function removeMessage(id) {
  return UserModel.deleteOne({
    _id: id,
  });
}

module.exports = {
  add: addUser,
  get: getUsers,
  update: updateName,
  remove: removeMessage,
};
