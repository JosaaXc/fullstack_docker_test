class Model {
    constructor(pool) {
        this.pool = pool;
    }

    async createTable() {
        try {
            const client = await this.pool.connect();
            try {
                const query = `
                    CREATE TABLE IF NOT EXISTS table_name (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100)
                    )
                `;
                await client.query(query);
            } finally {
                client.release();
            }
        } catch (err) {
            console.error('Error al crear la tabla:', err);
        }
    }

    async save(name) {
        try {
            const client = await this.pool.connect();
            try {
                const res = await client.query('INSERT INTO table_name (name) VALUES ($1) RETURNING *', [name]);
                return res.rows[0];
            } finally {
                client.release();
            }
        } catch (err) {
            console.error('Error al guardar:', err);
        }
    }
}

module.exports = Model;