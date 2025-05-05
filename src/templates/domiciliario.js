const PDFDocument = require('pdfkit');
const fs = require('fs');
const formatMoney = require('../utils/formatMoney');
const formatDate = require('../utils/formatDate');

function generarDomiciliario(data, outputPath) {
  const doc = new PDFDocument({
    size: [165, 1000], // Ancho de 58mm (165 puntos), alto libre
    margin: 10 // Márgenes ajustados
  });
  const fileName = `${outputPath}/domiciliario_${data.order.number}.pdf`;
  doc.pipe(fs.createWriteStream(fileName));

  doc.fontSize(8).text('Factura para Domiciliario', { align: 'center' });
  doc.moveDown();

  doc.fontSize(8).text(`Cliente: ${data.customer.name}`);
  doc.text(`Teléfono: ${data.customer.phone}`);
  doc.text(`Dirección: ${data.customer.address}`);
  doc.text(`Fecha: ${formatDate(data.order.created_at)}`);
  doc.text(`Forma de pago: ${data.order.payment_type}`);
  doc.moveDown();

  doc.fontSize(8).text('Resumen del Pedido:');
  doc.moveDown(0.5);
  data.items.forEach(item => {
    doc.text(`- ${item.quantity}x ${item.name}`);
  });

  doc.end();
}

module.exports = generarDomiciliario;

