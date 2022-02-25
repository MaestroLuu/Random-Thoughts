const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/randomThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
