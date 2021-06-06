const mongoClient = require("mongodb").MongoClient;
const logger = require("./logger");
const config = require("./config.json");

const COLLECTION = {
  DIAGRAM: "test_diagram",
  RUN_HISTORY: "test_run_history"
}

function setupConnection() {
  if (!global.connection) {
    mongoClient.connect(config.database.uri, { useUnifiedTopology: true })
      .then(con => {
        const _db = con.db();
        global.connection = { 
          mongoClient: con,
          dbDiagram: _db.collection(COLLECTION.DIAGRAM),
          dbRunHistory: _db.collection(COLLECTION.RUN_HISTORY)
        }
        logger.info("Database connected");
      })
      .catch(err => logger.error(err));
    }
}

async function dashboardHistory() {
  if (global.connection) {
    return await global.connection.dbRunHistory.find().sort({ startDate: -1 }).limit(20).toArray();
  }
  return [];
}

async function getDiagrams() {
  if (global.connection) {
    return await global.connection.dbDiagram.find().sort({ name: 1 }).toArray();
  }
  return [];
}

module.exports = {
  setupConnection,
  dashboardHistory,
  getDiagrams
}
