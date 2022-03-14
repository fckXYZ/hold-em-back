const router = require('express').Router();
const { createUser } = require('../controllers/user.controller');

router.post('/signup', createUser);

module.exports = router;
