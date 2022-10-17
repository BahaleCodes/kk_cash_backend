const express = require('express');
const router = express.Router();

const { create, employmentById, read, update, list } = require('../controllers/employment');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addEmpToUserHistory } = require('../controllers/user');

router.get('/employment/view/:employmentInfoId/:userId', requireSignin, isAuth, read);
router.post('/employment/create/:userId', requireSignin, isAuth, addEmpToUserHistory, create);
router.put('/employment/update/:employmentInfoId/:userId', requireSignin, isAuth, update);
router.get('/employment/all/:userId', requireSignin, isAuth, isAdmin, list);

router.param('employmentInfoId', employmentById);
router.param('userId', userById);

module.exports = router;
