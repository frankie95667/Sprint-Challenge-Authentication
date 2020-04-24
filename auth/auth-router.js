const router = require('express').Router();
const {insert, findBy} = require("../users/user-model");
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const ROUNDS = process.env.HASH_ROUNDS || 8;

  const hash = bcrypt.hashSync(credentials.password, ROUNDS);
  credentials.password = hash;
  insert(credentials)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something went wrong"})
  })
  
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const [user] = username ? await findBy({username}) : null;

  if(password && user && bcrypt.compareSync(password, user.password)){
    if(req.session){
      req.session.user = user;
    }
    res.status(200).json({message: "User successfully logged in"})
  } else {
    res.status(401).json({message: "Credentials are not correct"})
  }
});

module.exports = router;
