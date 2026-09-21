const data = require('../data/data.json');

class PurchaseDetailService {
  getPurchaseDetailById(purchaseId) {
    const detail = data.purchaseDetails.find(d => d.purchaseId === purchaseId);
    if (!detail) {
      return null;
    }
    return {
      id_compra: detail.purchaseId,
      nombreVendedor: detail.sellerName,
      estadoPago: detail.paymentStatus,
      estadoEnvio: detail.shippingStatus
    };
  }
}

module.exports = new PurchaseDetailService();