/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo waitlistdb scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/waitlistdb scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/waitlistdb scripts/init.mongo.js
 */

db.customers.remove({});

const customersDB = [
    {
      id: 1, name: 'Jeul', phone: '83918492', 
      timestamp: new Date('2021-09-30'), 
    },
    {
      id: 2, name: 'Yang', phone: '31094583', 
      timestamp: new Date('2021-10-01'), 
    },
  ];

db.customers.insertMany(customersDB);
const count = db.customers.count();
print('Inserted', count, 'customers');

db.counters.remove({ _id: 'customers' });
db.counters.insert({ _id: 'customers', current: count, serialnocnt: count });

db.customers.createIndex({ id: 1 }, { unique: true });
db.customers.createIndex({ status: 1 });
db.customers.createIndex({ owner: 1 });
db.customers.createIndex({ created: 1 });