'use strict';

const Hapi = require('@hapi/hapi');
const pool = require('./db'); // Assuming your db.js file is in the same directory

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Route to fetch and display users
    server.route({
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            const client = await pool.connect();
            try {
                const result = await client.query('SELECT * FROM users');
                return result.rows;
            } catch (error) {
                console.error("Error during database query", error);
                return h.response({ error: 'Failed to retrieve data', details: error.message }).code(500);
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
