import Feature from '../../schema/feature';

export default (req, res) => {
  Feature.findOne({id:req.params.id})
  .then((feature)=>{
    if (feature) {
      res.status(200).send({ feature });
    } else {
      res.status(404).send({error: 'feature not found'});
    }
  })
  .catch((error)=>{
    res.status(500).send({ error: error });
  })
};
