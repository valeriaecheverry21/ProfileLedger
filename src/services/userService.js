const data = require('../data/data.json');

class UserService {
  getUserById(userId) {
    const user = data.users.find(u => u.id === userId);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pointsLevel: user.pointsLevel,
      accountRestrictions: user.accountRestrictions
    };
  }

  getAllUsers() {
    return data.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      pointsLevel: user.pointsLevel,
      accountRestrictions: user.accountRestrictions
    }));
  }
}

module.exports = new UserService();