const router = require('express').Router();

const userCtrls = require('../ctrls/user-ctrls');

router.get('/', userCtrls.getUser);
router.get('/all', userCtrls.getAllUsers, userCtrls.getUser);

module.exports = router;