
class RoleModel {
    constructor(pool) {
        this.pool = pool;
    }

    async getAll() {
        const conn = await this.pool.getConnection();
        try {
            const [roles] = await conn.query('SELECT * FROM roles');
            return roles;
        } finally {
            conn.release();
        }
    }
}

module.exports = RoleModel;