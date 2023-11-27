const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const driveDetailRoutes = require('./routes/driveDetailRoute');
const userRoutes = require('./routes/userRoute');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb+srv://root:hq4TbQ1NwYY3PRxF@priyanshupersonal.q9jelbo.mongodb.net/monkeybox?retryWrites=true&w=majority';
app.use(bodyParser.json());

// Connecting to MongoDB
MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(); // Getting the database instance

    // Passing the database instance to the routes. The db name is monkeybox to view db data please contact me on iampriyanshu1009@gmail.com
    app.use('/drive', driveDetailRoutes(db)); 
    app.use('/user', userRoutes(db));

  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
