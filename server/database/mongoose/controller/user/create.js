import User from '../../schema/user';

export default (req, res) => {
  const userData = {
    name: req.body.name
  };
  return User.create(userData)
    .then(user => res.status(200).send({ user }))
    .catch(error => res.status(500).send({ error }));
};
