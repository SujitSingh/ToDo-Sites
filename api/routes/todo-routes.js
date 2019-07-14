const router = require('express').Router();

const todoCtrls = require('../ctrls/todo-ctrls');

router.get('/', todoCtrls.getAll, todoCtrls.getUserPosts);
router.get('/all', todoCtrls.getAll, todoCtrls.getUserPosts);
router.get('/posts', todoCtrls.getUserPosts);
router.get('/item/:id', todoCtrls.getItem);
router.post('/add', todoCtrls.addItem);
router.patch('/update/:id', todoCtrls.updateItem);
router.delete('/delete/:id', todoCtrls.deleteItem);

module.exports = router;