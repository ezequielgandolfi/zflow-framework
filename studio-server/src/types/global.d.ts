import { Collection, MongoClient } from "mongodb";

interface IConnection {
  mongoClient: MongoClient;
  dbDiagram: Collection;
  dbRunHistory: Collection;
}

declare global {
  namespace NodeJS {
    interface Global {
      connection: IConnection
    }
  }
}