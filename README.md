# @snett2019/factura-pdf 
Generador de PDFs para facturación personalizada usando `pdfkit`.

## Instalación

```bash
npm install @snett2019/factura-pdf

## Uso básico

```js
const { generarFacturas } = require('@snett2019/factura-pdf');
const pedido = require('./sample-order.json');

generarFacturas(pedido, './salida');
```

##  Testeo local

Para probar el generador localmente con un ejemplo incluido, ejecuta:

```bash
node test/test-generate.js
```

Este comando generará los archivos PDF en la carpeta `./salida`.

---

## 📥 Parámetros de la función

| Parámetro       | Tipo     | Descripción                                                |
|-----------------|----------|------------------------------------------------------------|
| `pedido`        | `Object` | Objeto con los datos del pedido (cliente, productos, etc.) |
| `carpetaSalida` | `String` | Ruta donde se guardarán los PDFs generados                 |

---

##  Salida esperada

Se generan **3 archivos PDF** en la carpeta especificada:

- `cliente_<ID>.pdf`
- `cocina_<ID>.pdf`
- `domiciliario_<ID>.pdf`

> Donde `<ID>` es el número del pedido incluido en el objeto `pedido`.

---

##  Autor

Santiago Trujillo Neuta – [GitHub](https://github.com/Santiago-byte2002)