const mongoose = require("mongoose");
const ProvenDB = require("@southbanksoftware/provendb-node-driver").Database;

const pass = encodeURIComponent("S!ddh@nt");
const provenDB_URI = `mongodb://siddhantj929:${pass}@34.94.88.60/med-share?ssl=true`;

let dbObject;
let pdb;

// First we establish a connection to ProvenDB.
mongoose
  .connect(provenDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(client => {
    console.log("Connected to db.");
    dbObject = mongoose.connection.db;
    pdb = new ProvenDB(dbObject);
  })
  .catch(err => {
    console.error("Error connecting to ProvenDB:");
    console.error(err);
    process.exit();
  });

module.exports = { dbObject, pdb };
