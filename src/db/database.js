import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
const promise = mongoClient.connect();

promise
  .then(() => {
    db = mongoClient.db(process.env.DATABASE_NAME);
    console.log("Connected to database!");
  })
  .catch((err) => console.error(err));

const objectId = ObjectId;

export { db, ObjectId };
