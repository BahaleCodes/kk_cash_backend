const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { create, listLoans, getStatusValue, updateLoanStatus, loanById } = require('../controllers/loan');
const { userById, addLoanToUserHistory } = require('../controllers/user');

router.post('/loan/create/:userId',  requireSignin,  isAuth, addLoanToUserHistory, create );
router.get( '/loan/list/:userId',  requireSignin,  isAuth,  isAdmin,  listLoans );
router.get( "/loan/status-values/:userId", requireSignin, isAuth, getStatusValue );
router.put( "/loan/update-status/:loanId/:userId", requireSignin, isAuth, isAdmin, updateLoanStatus );

router.param('loanId', loanById);
router.param('userId', userById);

module.exports = router;
