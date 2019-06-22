const router = require('express').Router();

const todoCtrls = require('../ctrls/todo-ctrls');

router.get('/', todoCtrls.getAll);
router.get('/all', todoCtrls.getAll);
router.get('/item/:id', todoCtrls.getItem);
router.post('/add', todoCtrls.addItem);
router.patch('/update', todoCtrls.updateItem);
router.delete('/delete', todoCtrls.deleteItem);

module.exports = router;