const router = require('express').Router();

const authCtrls = require('../ctrls/auth-ctrls');

router.post('/signup', authCtrls.signUp);
router.post('/login', authCtrls.logIn);
router.post('/logout', authCtrls.logOut);

module.exports = router;