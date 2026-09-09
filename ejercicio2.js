// ejercicio2.js
const express = require('express');
const app = express();
const PORT = 3001;

// Objeto de configuración con los porcentajes por país
const IMPUESTOS_PAIS = {
  'el salvador': { iva: 0.13, renta: 0.10, labelIVA: '13%', labelRenta: '10%' },
  'guatemala': { iva: 0.12, renta: 0.05, labelIVA: '12%', labelRenta: '5%' },
  'costa rica': { iva: 0.13, renta: 0.15, labelIVA: '13%', labelRenta: '15%' },
  'honduras': { iva: 0.15, renta: 0.10, labelIVA: '15%', labelRenta: '10%' },
  'panama': { iva: 0.07, renta: 0.10, labelIVA: '7%', labelRenta: '10%' },
  'nicaragua': { iva: 0.15, renta: 0.10, labelIVA: '15%', labelRenta: '10%' }
};

// Ruta para calcular impuestos: /api/impuestos/:pais/:salario
app.get('/api/impuestos/:pais/:salario', (req, res) => {
  try {
    const { pais, salario } = req.params;

    // 1. Validar el salario
    const salarioBruto = parseFloat(salario);
    if (isNaN(salarioBruto) || salarioBruto <= 0) {
      return res.status(400).json({
        error: 'El salario debe ser un número mayor a cero.'
      });
    }

    // 2. Normalizar y validar el país
    const paisNormalizado = pais.toLowerCase().trim();
    const configImpuestos = IMPUESTOS_PAIS[paisNormalizado];

    if (!configImpuestos) {
      return res.status(400).json({
        error: `El país '${pais}' no es válido. Países permitidos: El Salvador, Guatemala, Costa Rica, Honduras, Panama, Nicaragua.`
      });
    }

    // 3. Cálculos
    const iva = parseFloat((salarioBruto * configImpuestos.iva).toFixed(2));
    const renta = parseFloat((salarioBruto * configImpuestos.renta).toFixed(2));
    const salarioNeto = parseFloat((salarioBruto - iva - renta).toFixed(2));

    // 4. Formatear el país para la salida (ej: "elsalvador")
    const paisSalida = paisNormalizado.replace(/\s+/g, '');

    // 5. Respuesta JSON con la estructura requerida
    res.json({
      pais: paisSalida,
      salarioBruto: salarioBruto,
      porcentajeIVA: configImpuestos.labelIVA,
      porcentajeRenta: configImpuestos.labelRenta,
      iva: iva,
      renta: renta,
      salarioNeto: salarioNeto
    });

  } catch (error) {
    res.status(500).json({
      error: 'Ocurrió un error interno en el servidor.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor del Ejercicio 2 corriendo en http://localhost:${PORT}`);
});