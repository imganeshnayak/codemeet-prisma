const mongoose = require('./backend/node_modules/mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/app').then(async () => {
  const seedTitles = [
    'Plant Today, Breathe Tomorrow',
    'A Garden Grown Together',
    'Restore a Forest, Renew Hope',
    'Meals That Carry Hope',
    'Small Actions, Cleaner Streets',
    'Growing Roots and Friendships',
    'Warm Clothes, Warmer Hearts',
    'A Community That Shows Up'
  ];
  const res = await mongoose.connection.db.collection('articles').deleteMany({
    title: { $in: seedTitles }
  });
  console.log('Deleted dummy seed articles:', res.deletedCount);
  const remaining = await mongoose.connection.db.collection('articles').find().toArray();
  console.log('Remaining real articles in DB count:', remaining.length);
  remaining.forEach(a => console.log(' - Real Article:', a.title));
  process.exit(0);
});

