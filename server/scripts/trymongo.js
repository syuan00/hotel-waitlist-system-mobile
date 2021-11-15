const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/waitlistdb';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/waitlistdb?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/waitlistdb';

async function testWithAsync() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('customers');

    console.log('--- CREATE ---');
    const customer = { id: 3, name: 'Paul', phone: "45389625" };
    const result = await collection.insertOne(customer);
    console.log('Result of insert:\n', result.insertedId);

    console.log('--- READ ---');
    var docs = await collection.find({}).toArray();
    console.log('Result of find:\n', docs);

    console.log('--- UPDATE ---');
    await collection.updateOne({ id: 2 }, { $set: {name: "UPDATE NAME" } })
    docs = await collection.find({id: 2}).toArray();
    console.log('After updating the customer with id of 2:\n', docs);

    console.log('--- DELETE ---');
    await collection.deleteOne({ id: 2 });
    docs = await collection.find({}).toArray();
    console.log('After deleting the customer with id of 2:\n', docs);
  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();