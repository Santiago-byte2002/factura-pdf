 const dayjs = require('dayjs');

module.exports = function formatDate(date) {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};
