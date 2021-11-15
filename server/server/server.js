const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/waitlistdb';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/waitlistdb?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/waitlistdb';

let db;

let aboutMessage = "Hotel California Waitlist API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    customerList,
    customer,
  },
  Mutation: {
    setAboutMessage,
    customerAdd,
    customerDelete,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function customerList() {
  const customers = await db.collection('customers').find({}).toArray();
  return customers;
}

async function customer(_, { id }) {
  const result = await db.collection('customers').findOne({ id: id });
  return result;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1, serialnocnt: 1 } },
    { returnOriginal: false },
  );
  return result.value.serialnocnt;
}

async function customerAdd(_, { customer }) {
  const result = await db.collection('counters').findOne({ _id: "customers" });
  if (result.current >= 25) {
    console.log("Error: The waitlist is already Full!"); 
  }
  else {
    customer.timestamp = new Date();
    customer.id = await getNextSequence('customers');
    const result = await db.collection('customers').insertOne(customer);
    const savedCustomer = await db.collection('customers').findOne({ _id: result.insertedId });
  }
  return savedCustomer;
}

async function customerDelete(_, { id }) {
  const result = await db.collection('counters').findOne({ _id: "customers" });
  if (result.current == 0) {
    console.log("Error: The waitlist is empty!"); 
  } 
  else {
    await db.collection('customers').deleteOne({ id: id });
    await db.collection('counters').findOneAndUpdate(
      { _id: 'customers' },
      { $inc: { current: -1} },
      { returnOriginal: false },
    );
  }
  return id;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();