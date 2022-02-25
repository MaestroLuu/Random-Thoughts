const { connect, connection } = require('mongoose');

connect('mongodb://localhost/randomThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
