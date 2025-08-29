import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Método no permitido' });
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    try {
        await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: 'Matías', email: 'matiasmollica99@gmail.com' }, // Email verificado en Brevo
                to: [{ email: 'matiasmollica99@gmail.com' }], // Email donde querés recibir los mensajes
                subject: `Nuevo mensaje de ${name}`,
                htmlContent: `<p><strong>Nombre:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Mensaje:</strong><br>${message}</p>`
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error enviando el correo:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    }
}
