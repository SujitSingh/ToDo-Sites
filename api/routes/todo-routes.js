const router = require('express').Router();

const todoCtrls = require('../ctrls/todo-ctrls');

router.get('/', todoCtrls.getList);
router.get('/list', todoCtrls.getList);
router.post('/add', todoCtrls.addItem);
router.patch('/update', todoCtrls.updateItem);
router.delete('/delete', todoCtrls.deleteItem);

module.exports = router;