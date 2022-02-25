const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = getRandomThoughts(2);

  for (let i = 0; i < 10; i++) {
    const username = getRandomUser();
    const email = getRandomEmail();
    const friends = getRandomUser();

    users.push({
      username,
      email,
      friends,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved thoughts, for each thought we need to generate a thought reaction and insert the reaction
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
