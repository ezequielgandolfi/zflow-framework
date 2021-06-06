import { MongoClient } from "mongodb";
import { Logger } from "./logger";
import { Config } from "./config"

const config = new Config();

const COLLECTION = {
  DIAGRAM: "test_diagram",
  RUN_HISTORY: "test_run_history"
}

export class Database {
  setupConnection() {
    if (!global.connection) {
      MongoClient.connect(config.env.database.uri, { useUnifiedTopology: true })
        .then(con => {
          const _db = con.db();
          global.connection = { 
            mongoClient: con,
            dbDiagram: _db.collection(COLLECTION.DIAGRAM),
            dbRunHistory: _db.collection(COLLECTION.RUN_HISTORY)
          }
          Logger.info("Database connected");
        })
        .catch(err => Logger.error(err));
      }
  }
  
  async dashboardHistory() {
    if (global.connection) {
      return await global.connection.dbRunHistory.find().sort({ startDate: -1 }).limit(20).toArray();
    }
    return [];
  }
  
  async getDiagrams() {
    if (global.connection) {
      return await global.connection.dbDiagram.find().sort({ name: 1 }).toArray();
    }
    return [];
  }
}
