const jwt = require('jsonwebtoken');
const secretKey = 'KLVKMdsrihfb20024e#fga.gdadggs';

const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          }
          req.user = decoded;
          next();
        });
      } else {
        return res.status(401).json({ message: 'Token not provided' });
      }
}

module.exports = verifyToken