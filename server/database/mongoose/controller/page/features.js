import Feature from '../../schema/feature';

export default (req, res) => {
  Feature.find({})
  .then((features)=>{
    if (features.length) {
      res.status(200).send({ features });
    } else {
      res.status(404).send({error: 'feature not found'});
    }
  })
  .catch((error)=>{
    res.status(500).send({ error: error });
  })
};
