const mongoose = require('mongoose');

module.exports = () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/fin-api';
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
};
