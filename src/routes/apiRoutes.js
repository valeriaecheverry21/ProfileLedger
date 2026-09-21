const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const purchaseController = require('../controllers/purchaseController');
const purchaseDetailController = require('../controllers/purchaseDetailController');

// User Profile
router.get('/users/:userId/profile', userController.getProfile);

// Purchase History (with pagination)
router.get('/users/:userId/purchases', purchaseController.getPurchaseHistory);

// Purchase Detail
router.get('/purchases/:purchaseId', purchaseController.getPurchaseById);
router.get('/purchases/:purchaseId/detail', purchaseDetailController.getPurchaseDetail);

module.exports = router;