const Hapi = require('@hapi/hapi');
// const { sequelize, User } = require('./models');
const db = require('./db')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        handler: async (request, h) => {
            let getname = await db.query('SELECT name FROM "user" WHERE id = $1', [request.params.id]);
            return `Hello ${getname.rows[0].name}!`;
        }
    });

    await server.start();
    // await sequelize.authenticate();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();