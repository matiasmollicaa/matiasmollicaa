require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey('TU_API_KEY_DE_SENDGRID'); // <- pon tu API key aquí

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'tucorreo@protonmail.com', // <- tu correo
        from: 'noreply@tudominio.com', // <- debe estar verificado en SendGrid
        subject: `Nuevo mensaje de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        html: `<p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong> ${message}</p>`,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));