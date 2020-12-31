const dashboardRepository = require('../repository/dashboard.repository');

const getHistoryOrderData = () => {
  return dashboardRepository.getHistoryOrderData();
};

module.exports = {
  getHistoryOrderData,
};
