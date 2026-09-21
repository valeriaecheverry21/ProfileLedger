const purchaseDetailService = require('../services/purchaseDetailService');

class PurchaseDetailController {
  async getPurchaseDetail(req, res, next) {
    try {
      const purchaseId = parseInt(req.params.purchaseId, 10);
      
      if (isNaN(purchaseId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid purchase ID. Must be a number.'
        });
      }

      const detail = purchaseDetailService.getPurchaseDetailById(purchaseId);
      
      if (!detail) {
        return res.status(404).json({
          success: false,
          message: 'Purchase detail not found'
        });
      }

      res.status(200).json({
        success: true,
        data: detail
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchaseDetailController();