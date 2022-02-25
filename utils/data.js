const usernames = [
  'shaquille.oatmeal',
  'hoosier-daddy',
  'fast_and_the_curious',
  'HairyPoppins',
  'fedora_the_explorer',
  'actuallynotchrishemsworth',
  'Avocadorable',
  'FreeHugz',
  'Chris_P_Bacon',
  'Aaran',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];
  
const thoughts = [
  'When poison expires, is it more poisonous or not longer poisonous?',
  'When you are a kid, you do n0t realize that you are also watching your mom and dad grow up.',
  'Dads probably bond with dog because men do not get affection but dogs give tons of affection regardless',
  'Being able to tolerate the sound of your own voice in a video is probably the highest form of self acceptance.',
  'Being able to do well in school without having to put in much effort is actually a big disadvantage later in life.',
  'The sentence "Do not objectify women" has "women" as the object of the sentence.',
  'It kinda makes sense that the target audience for fidget spinners lost interest in them so quickly',
  'You are not paid according to how hard you work; you are paid according to how hard you are to replace',
  'Night before a day off is more satisfying than the actual day off.',
  'One of the most frustrating feelings is being smart enough to know there is a better way to do something but not smart enough to invent a way to do it.',
  'Watching a graduation ceremony is like sitting through a movie thats entirely end credits',
  'Running from the cops is the ultimate double or nothing.',
  'Placing hand sanitizers in elevators would probably increase their usage simply because people have nothing else to do.',
  'Being an adult is eating the crust not because you like it, but because you paid for it.',
  'The ten years between 25 and 35 are far shorter than the four years between 14 and 18.',
];

const reactions = [
  'Absolutely agree with you!',
  'You are preaching the truth!',
  'How accurate is this?',
  'Bro, slaps...',
  'I actually dont get what youre talking about...',
  'No cap',
  'Sheeeee!',
  'Flexing hard here.',
  'Yeet.',
  'Im dead, this be mad lit',
]
// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUser = () =>
  `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}` ;

// Gets random email
const getRandomEmail = () => 
  `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}@gmail.com`;

// Gets random reaction
const getRandomReaction = () =>
  getRandomArrItem(reactions);

// Function to generate random thoughts that we can add to the database. Includes thought reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      username: getRandomArrItem(usernames),
      reactions: [...getRandomReaction(3)],
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, getRandomThoughts, getRandomEmail };
