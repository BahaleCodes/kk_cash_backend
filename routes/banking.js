const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, bankingInfoById, read, update, list } = require('../controllers/banking');
const { userById, addBankingToUserHistory } = require('../controllers/user');

router.post('/bank/create/:userId', requireSignin, isAuth, addBankingToUserHistory, create);
router.get('/bank/view/:bankingInfoId/:userId', requireSignin, isAuth, read);
router.put('/bank/update/:bankingInfoId/:userId', requireSignin, isAuth, update);
router.get('/bank/all/:userId', requireSignin, isAuth, isAdmin, list);

router.param('bankingInfoId', bankingInfoById);
router.param('userId', userById);

module.exports = router;
