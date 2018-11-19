import User from '../../schema/user';

export default (req, res) => {
  if (!req.session.user) {
    return res.status(403).send({ message: 'No user present' });
  }
  return User.find({})
    .then(users => res.status(200).send({ users }))
    .catch(error => res.status(500).send({ error }));
};
