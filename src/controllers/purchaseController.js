const purchaseService = require('../services/purchaseService');

class PurchaseController {
  async getPurchaseHistory(req, res, next) {
    try {
      const userId = parseInt(req.params.userId, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID. Must be a number.'
        });
      }

      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      if (page < 1) {
        return res.status(400).json({
          success: false,
          message: 'Page must be greater than 0'
        });
      }

      if (limit < 1 || limit > 100) {
        return res.status(400).json({
          success: false,
          message: 'Limit must be between 1 and 100'
        });
      }

      const result = purchaseService.getPurchasesByUserId(userId, page, limit);
      
      if (result.data.length === 0 && page > 1) {
        return res.status(404).json({
          success: false,
          message: 'Page not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  }

  async getPurchaseById(req, res, next) {
    try {
      const purchaseId = parseInt(req.params.purchaseId, 10);
      
      if (isNaN(purchaseId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid purchase ID. Must be a number.'
        });
      }

      const purchase = purchaseService.getPurchaseById(purchaseId);
      
      if (!purchase) {
        return res.status(404).json({
          success: false,
          message: 'Purchase not found'
        });
      }

      res.status(200).json({
        success: true,
        data: purchase
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchaseController();