const data = require('../data/data.json');

class PurchaseDetailService {
  getPurchaseDetailById(purchaseId) {
    const detail = data.purchaseDetails.find(d => d.purchaseId === purchaseId);
    if (!detail) {
      return null;
    }
    return {
      purchaseId: detail.purchaseId,
      sellerName: detail.sellerName,
      paymentStatus: detail.paymentStatus,
      shippingStatus: detail.shippingStatus
    };
  }
}

module.exports = new PurchaseDetailService();