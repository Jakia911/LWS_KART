import { MongoClient } from 'mongodb';

// Extend global to include MongoClientPromise
declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGO_URI_CONNECTION) {
  throw new Error(
    'Invalid/Missing environment variable: "MONGO_URI_CONNECTION"'
  );
}

const uri: string = process.env.MONGO_URI_CONNECTION;
const options = {};

let client: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (process.env.ENVIRONMENT === 'development') {
  if (!global.__mongoClientPromise) {
    client = new MongoClient(uri, options);
    global.__mongoClientPromise = client.connect();
  }
  mongoClientPromise = global.__mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
}

export default mongoClientPromise;
