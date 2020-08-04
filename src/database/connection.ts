import knex from 'knex';
import path from 'path';

// migrations control the db version

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, 
});

export default db;