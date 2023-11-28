const jwt = require('jsonwebtoken');
const secretKey = 'KLVKMdsrihfb20024e#fga.gdadggs';

module.exports = async (req, res, db) => {
  console.log("At line 5")
  const data = req.body
  const usersCollection = db.collection('users');
  const existingUser = await usersCollection.findOne({ email: data.email });
  let userData;
  if (existingUser){
     userData = await usersCollection.findOneAndUpdate(
    {email: existingUser.email},
    { $set: { googleToken : data.googleToken  } },
    { returnDocument: 'after' })
  }else{
    userData = await usersCollection.insertOne(data)
  }
  const user = {
    id : userData._id
  }

  const accessToken = jwt.sign(user, secretKey, { expiresIn: '1h' });
  console.log(accessToken)
  res.json({ message: 'Signup successful', accessToken });
};

