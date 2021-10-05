import * as Hapi from '@hapi/hapi';
// import { pool } from './db';
import db from './models';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: async (request, h) => {
            let user = request.payload
            try {
                const userAdd = await db.User.create(user);
                return userAdd;
            } catch(error) {
                console.log(error);
            };
        }
    });

    await server.start();
    await db.sequelize.sync({ force: true });
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();