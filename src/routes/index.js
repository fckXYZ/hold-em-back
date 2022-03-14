const router = require('express').Router();
const UserRouter = require('./user.router');

router.use('/', UserRouter);

module.exports = router;
