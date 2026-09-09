const express = require('express');
const app = express();
const PORT = 3000;

// Ruta solicitada: /api/funcion/:monto
app.get('/api/calculo/:monto', (req, res) => {
    const { monto } = req.params;
    const montoNumerico = Number(monto);

    // Validaciones: no es número, es 0 o es negativo
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
        return res.status(400).json({
            error: "El salario debe ser un número mayor a cero"
        });
    }

    // Cálculos según valores de El Salvador (SV)
    const iva = montoNumerico * 0.13;   // IVA 13%
    const renta = montoNumerico * 0.10; // Renta 10%

    // Respuesta JSON exitosa
    return res.json({
        monto: montoNumerico,
        iva: iva,
        renta: renta
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});