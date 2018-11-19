import User from '../../schema/user';

export const signUp = (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };
  User.create(userData)
    .then(() => User.findOne({ email: userData.email }))
    .then(user => {
      if (user) {
        res.status(200).send();
      } else {
        res.status(404).send('Error: User not found');
      }
    })
    .catch(error => {
      res.status(500).send('Error: ', error);
    });
};
