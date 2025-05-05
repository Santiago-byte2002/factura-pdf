const PDFDocument = require('pdfkit');
const fs = require('fs');
const formatDate = require('../utils/formatDate');

function generarCocina(data, outputPath) {
  const doc = new PDFDocument({
    size: [165, 1000], // Ancho de 58mm (165 puntos), alto libre
    margin: 10 // Márgenes ajustados
  });
  const fileName = `${outputPath}/cocina_${data.order.number}.pdf`;
  doc.pipe(fs.createWriteStream(fileName));

  doc.fontSize(10).text('Orden para Cocina', { align: 'center' });
  doc.moveDown();

  doc.fontSize(8).text(`Cliente: ${data.customer.name}`);
  doc.text(`Dirección: ${data.customer.address}`);
  doc.text(`Fecha: ${formatDate(data.order.created_at)}`);
  doc.text(`Pedido #: ${data.order.number}`);
  doc.moveDown();

  doc.fontSize(9).text('Preparar los siguientes productos:');
  doc.moveDown(0.5);

  data.items.forEach(item => {
    doc.fontSize(8).text(`- ${item.quantity}x ${item.name}`);

    // Variantes
    item.variants.forEach(variant => {
      if (variant.options.length > 0) {
        const optionsList = variant.options.map(opt => opt.name).join(', ');
        doc.fontSize(8).text(`   • ${variant.name}: ${optionsList}`);
      }
    });

    // Addons
    if (item.addons.length > 0) {
      doc.fontSize(9).text(`   • Extras:`);
      item.addons.forEach(addon => {
        doc.text(`     - ${addon.quantity}x ${addon.name}`);
      });
    }

    doc.moveDown(0.5);
  });

  doc.end();
}

module.exports = generarCocina;