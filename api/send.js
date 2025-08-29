import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: name, email: 'matiasmollica99@tudominio.com' },
                to: [{ email: 'matiasmollica99@gmail.com' }],
                subject: 'Nuevo mensaje de contacto',
                htmlContent: `<p><strong>Nombre:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Mensaje:</strong> ${message}</p>`
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ success: true });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
        }
    } else {
        res.status(405).json({ success: false });
    }
}