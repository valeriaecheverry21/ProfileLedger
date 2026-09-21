const data = require('../data/data.json');

class UserService {
  getUserById(userId) {
    const user = data.users.find(u => u.id === userId);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      nombre: user.name,
      email: user.email,
      nivelPuntos: user.pointsLevel,
      restriccionesCuenta: {
        tieneDeuda: user.accountRestrictions.hasDebt,
        estaBloqueado: user.accountRestrictions.isBlocked,
        motivoBloqueo: user.accountRestrictions.blockReason
      }
    };
  }

  getAllUsers() {
    return data.users.map(user => ({
      id: user.id,
      nombre: user.name,
      email: user.email,
      nivelPuntos: user.pointsLevel,
      restriccionesCuenta: {
        tieneDeuda: user.accountRestrictions.hasDebt,
        estaBloqueado: user.accountRestrictions.isBlocked,
        motivoBloqueo: user.accountRestrictions.blockReason
      }
    }));
  }
}

module.exports = new UserService();