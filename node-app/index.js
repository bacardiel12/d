'use strict';

const Hapi = require('@hapi/hapi');
const pool = require('./db'); // Ensure the path to db.js is correct

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM A_schema.user');
                const users = result.rows.map(user => `${user.name}, ${user.email}`).join('; ');
                return `Hello, world!!\n Here are the users:\n ${users}`;
            } catch (error) {
                console.error("Error during database query", error);
                return h.response({
                    error: 'Failed to retrieve data',
                    details: error.message
                }).code(500);
            } finally {
                client.release();
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
