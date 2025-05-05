const { generarFacturas } = require('../src');
const pedido = require('../example/sample-order.json');

generarFacturas(pedido, './salida'); 
