const config = require('../config.json');
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI || config.connectionString, {  useNewUrlParser: true });
mongoose.Promise = global.Promise;
console.log("Ready to connect");
mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

module.exports = {
    User: require('../models/user.model'),
    Agent : require('../models/agent.model'),
    Account : require('../models/account.model'),
    PolicyCategory : require('../models/policyCategory.model'),
    PolicyCarrier : require('../models/policyCarrier.model'),
    PolicyInfo : require('../models/policyInfo.model'),
    ScheduledMessage: require('../models/scheduledMessage.model'),

}