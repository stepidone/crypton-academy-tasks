import * as Hapi from '@hapi/hapi';
import { Sequelize } from 'sequelize';
// import { pool } from './db';
import db from './models';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/faculty',
        handler: async (request, h) => {
            let faculty = request.payload
            try {
                const facultyAdd = await db.Faculty.create(faculty);
                return facultyAdd;
            } catch(error) {
                console.log(error);
            };
        }
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

    server.route({
        method: 'GET',
        path: '/faculty',
        handler: async  (request, h) => {
            return db.Faculty.findAll({
                attributes: ['id', 'name']
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: async  (request, h) => {
            return db.User.findAll({
                order: [['averageGrade', 'DESC']],
                attributes: ['id', 'firstName', 'lastName', 'sex', 'averageGrade', 'faculty_id']
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/avgGrade/{faculty}',
        handler: async  (request, h) => {
            return db.User.findAll({
                where: {
                    faculty_id: request.params.faculty
                },
                attributes: [[Sequelize.fn('avg', Sequelize.col('averageGrade')), 'averageFacultyGrade']]
            });
        }
    })

    server.route({
        method: 'GET',
        path: '/minmax/{faculty}',
        handler: async  (request, h) => {
            return db.User.findAll({
                where: {
                    faculty_id: request.params.faculty
                },
                attributes: [
                    [Sequelize.fn('min', Sequelize.col('averageGrade')), 'minFaculty'],
                    [Sequelize.fn('max', Sequelize.col('averageGrade')), 'maxFaculty']
                ]
            });
        }
    })

    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: async  (request, h) => {
            const userid = await db.User.findOne({
                where: {
                    id: request.params.id
                }
            });

            if (userid === null) {
                return 'not found';
            } else {
                return userid;
            }
        }
    })

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: async  (request, h) => {
            const payload = request.payload;
            const updateuser = await db.User.update(payload, {
                where: {
                    id: request.params.id
                }
            });
            if (updateuser === null) {
                return 'not found';
            } else {
                return db.User.findOne({
                    where: {
                        id: request.params.id
                    }
                });
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: async  (request, h) => {
            return db.User.findAll({
                include: {
                    model: db.Faculty,
                    attributes: ['name'],
                    where: {
                        'name': request.query.faculty,
                    }
                },
                where: {
                    sex: request.query.sex
                },
                attributes: ['id', 'firstName', 'lastName', 'sex', 'averageGrade']
            });
        }
    })

    await server.start();
    await db.sequelize.sync();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

function firstName(firstName: any): any {
    throw new Error('Function not implemented.');
}
