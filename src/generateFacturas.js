 const generarDomiciliario = require('./templates/domiciliario');
const generarCliente = require('./templates/cliente');
const generarCocina = require('./templates/cocina'); 

async function generarFacturas(data, outputPath = './salida') {
  generarDomiciliario(data, outputPath);
  generarCliente(data, outputPath);
  generarCocina(data, outputPath); 
}

module.exports = { generarFacturas };
