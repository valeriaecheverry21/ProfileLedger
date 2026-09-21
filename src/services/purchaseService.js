const data = require('../data/data.json');

class PurchaseService {
  getPurchasesByUserId(userId, page = 1, limit = 10) {
    const userPurchases = data.purchases
      .filter(p => p.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalItems = userPurchases.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPurchases = userPurchases.slice(startIndex, endIndex);

    return {
      data: paginatedPurchases.map(p => ({
        id: p.id,
        date: p.date,
        product: p.product,
        quantity: p.quantity,
        totalPrice: p.totalPrice
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  }

  getPurchaseById(purchaseId) {
    const purchase = data.purchases.find(p => p.id === purchaseId);
    if (!purchase) {
      return null;
    }
    return {
      id: purchase.id,
      userId: purchase.userId,
      date: purchase.date,
      product: purchase.product,
      quantity: purchase.quantity,
      totalPrice: purchase.totalPrice
    };
  }
}

module.exports = new PurchaseService();