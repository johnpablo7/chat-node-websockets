const store = require("./store");

function addUser(name) {
  if (!name) {
    return Promise.reject("Name not found");
  }

  const user = {
    name,
  };

  return store.add(user);
}

function getUsers(filterByName) {
  return new Promise((resolve) => {
    resolve(store.get(filterByName));
  });
}

function updateUser(id, changes) {
  if (!id) {
    return Promise.reject("No id or message found");
  }

  return store.update(id, changes);
}

function deleteUser(id) {
  if (!id) {
    return Promise.reject("Id not found");
  }

  return store.remove(id);
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
};
