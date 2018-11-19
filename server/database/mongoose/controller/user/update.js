import User from '../../schema/user';

export default (req, res) => {
  if (!req.session.user) {
    return res.status(403).send({ message: 'No user present' });
  }
  return User.findOne({
    _id: req.body.id
  })
    .then(user => user.update(req.body))
    .then(user => res.status(200).send({ user }))
    .catch(error => res.status(500).send({ error }));
};
