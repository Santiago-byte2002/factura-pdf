const currencyFormatter = require('currency-formatter');

module.exports = function formatMoney(value) {
  return currencyFormatter.format(value, { code: 'COP' });
};
 
