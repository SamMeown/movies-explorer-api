const router = require('express').Router();

const { getUser, updateUserInfo } = require('../controllers/users');
const { validateUpdateUserInfo } = require('../validators/user');

router.get('/me', getUser);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

module.exports = router;
