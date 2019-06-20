
const getList = (req, res, next) => {
  res.send('TODO List');
};

const addItem = (req, res, next) => {
  res.send('TODO Add');
}

const updateItem = (req, res, next) => {
  res.send('TODO Update');
}

const deleteItem = (req, res, next) => {
  res.send('TODO Update');
}

module.exports = { getList, addItem, updateItem, deleteItem };