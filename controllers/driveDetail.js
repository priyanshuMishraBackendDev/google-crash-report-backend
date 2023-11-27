const jwt = require('jsonwebtoken');
const secretKey = 'KLVKMdsrihfb20024e#fga.gdadggs';
const { getDriveData } = require('../../monkeybox/middleware/driveFunctions')
const { ObjectId } = require('mongodb')

module.exports = async (req, res, db) => {
  const id = new ObjectId(req.user.id)
  console.log(id)
  const usersCollection = db.collection('users');
  const userData = await usersCollection.findOne({_id : id})
  console.log(userData)
  if (!userData){
    return res.status(404).json({message: 'User not found'})
  }
   getDriveData(userData.googleToken).then((dataToReturn)=>{
       res.json( dataToReturn );
   })

};
