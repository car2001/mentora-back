const pool = require('../db');
const LoginModel = require('../models/mysql/login');
const loginModel = new LoginModel(pool);

class LoginController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await loginModel.authenticate(email, password);
            if (!user) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
            }
            // Aquí puedes generar y devolver un token JWT si lo deseas
            res.json({ message: 'Login exitoso', user });
        } catch (error) {
            console.error('Error en login:', error.message);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}

module.exports = LoginController;
