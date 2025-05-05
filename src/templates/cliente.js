const PDFDocument = require('pdfkit');
const fs = require('fs');
const formatMoney = require('../utils/formatMoney');
const formatDate = require('../utils/formatDate');

function generarCliente(data, outputPath) {
  const doc = new PDFDocument({
    size: [165, 1000], // Ancho de 58mm (165 puntos), alto libre
    margin: 10 // Márgenes ajustados
  });
  const fileName = `${outputPath}/cliente_${data.order.number}.pdf`;
  doc.pipe(fs.createWriteStream(fileName));

  doc.fontSize(10).text('Recibo de Compra', { align: 'center' });
  doc.moveDown();

  doc.fontSize(8).text(`Cliente: ${data.customer.name}`);
  doc.text(`Teléfono: ${data.customer.phone}`);
  doc.text(`Dirección: ${data.customer.address}`);
  doc.text(`Fecha: ${formatDate(data.order.created_at)}`);
  doc.text(`Pedido #: ${data.order.number}`);
  doc.text(`Forma de pago: ${data.order.payment_type}`);
  doc.moveDown();

  doc.fontSize(9).text('Detalle del Pedido:');
  doc.moveDown(0.5);

  data.items.forEach(item => {
    const totalItem = item.price * item.quantity;
    doc.text(`${item.quantity}x ${item.name} - ${formatMoney(totalItem)}`);

    // Variantes
    item.variants.forEach(variant => {
      if (variant.options.length > 0) {
        const optionsList = variant.options.map(opt => {
          const priceText = opt.price_adjustment > 0 ? ` (+${formatMoney(opt.price_adjustment)})` : '';
          return `${opt.name}${priceText}`;
        }).join(', ');
        doc.fontSize(8).text(`   • ${variant.name}: ${optionsList}`);
      }
    });

    // Addons (si existen)
    if (item.addons.length > 0) {
      doc.fontSize(9).text(`   • Extras:`);
      item.addons.forEach(addon => {
        doc.text(`     - ${addon.name} (${formatMoney(addon.price)})`);
      });
    }

    doc.moveDown(0.5);
  });

  doc.moveDown();
  doc.fontSize(9).text(`Total: ${formatMoney(data.order.total_price)}`, { align: 'right' });

  doc.end();
}

module.exports = generarCliente;
