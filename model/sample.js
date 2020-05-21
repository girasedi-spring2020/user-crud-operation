// app/models/sample.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = new Schema({
    email: String,
    pwd: String
  });

var connection = mongoose.createConnection('mongodb://localhost/loginDB');
var exportModel = connection.model('logintables', tableSchema);

// define our sample model
// module.exports allows us to pass this to other files when it is called
module.exports = exportModel;//mongoose.model('LoginTable', tableSchema);