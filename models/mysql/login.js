class LoginModel {
    constructor(pool) {
        this.pool = pool;
    }

    async authenticate(email, password) {
        const conn = await this.pool.getConnection();
        try {
            // Busca el usuario por email
            const [rows] = await conn.query(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );
            if (rows.length === 0) {
                return null; // Usuario no encontrado
            }
            const user = rows[0];
            // Aquí deberías comparar el password hasheado
            // Por simplicidad, compara texto plano (mejorar en producción)
            if (user.contraseña !== password) {
                return null; // Contraseña incorrecta
            }
            return user; // Usuario autenticado
        } finally {
            conn.release();
        }
    }
}

module.exports = LoginModel;
