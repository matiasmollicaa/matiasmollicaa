require('dotenv').config(); // carga variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Tu API Key de Brevo desde el .env
const BREVO_API_KEY = process.env.BREVO_API_KEY;

// Ruta para recibir el formulario
app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    try {
        // Enviar email usando Brevo (Sendinblue)
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: 'Matías', email: 'noreply@https://matiasmollicaa.github.io/matiasmollicaa/' }, // debe estar verificado en Brevo
                to: [{ email: 'matiasmollica99@gmail.com', name: 'Matías' }],
                subject: `Nuevo mensaje de ${name}`,
                htmlContent: `
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensaje:</strong><br>${message}</p>
                `
            },
            {
                headers: {
                    'api-key': BREVO_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        res.status(200).json({ success: true, message: 'Correo enviado correctamente' });

    } catch (error) {
        console.error('Error enviando el correo:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    }
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));