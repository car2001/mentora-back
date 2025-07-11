
class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    async create(user) {
        const conn = await this.pool.getConnection();
        try {
            // Iniciar transacción
            await conn.beginTransaction();
            // Insertar en usuarios
            const [result] = await conn.query(
                `INSERT INTO usuarios (nombre, apellido, email, contraseña, rol_id)
                 VALUES (?, ?, ?, ?, ?)`,
                [user.nombre, user.apellido, user.email, user.password, user.rol_id]
            );

            const usuarioId = result.insertId;

            // Insertar en tabla relacionada según el rol
            if (user.rol_id === 2) {
                // Mentor → profesores
                await conn.query(
                    `INSERT INTO profesores (usuario_id, biografia, tarifa_hora, ubicacion, idiomas)
                     VALUES (?, '', 0.00, '', '')`,
                    [usuarioId]
                );
            } else if (user.rol_id === 1) {
                // Estudiante → estudiantes
                await conn.query(
                    `INSERT INTO estudiantes (usuario_id) VALUES (?)`,
                    [usuarioId]
                );
            } else {
                throw new Error("Rol inválido"); // Rol no reconocido
            }

            // Confirmar transacción
            await conn.commit();
            return usuarioId;

        } catch (error) {
            // Revertir cambios si hay error
            await conn.rollback();
            console.error("Error durante la transacción:", error.message);
            throw error;
        } finally {
            conn.release();
        }
    }
}

module.exports = UserModel;