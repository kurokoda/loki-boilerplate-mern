import features from './features';
import Feature from '../../schema/feature';

export const seed = () => {
  //seedFeatures()
};

export const seedFeatures = () => {
  features.map(feature => {
    Feature.remove({})
    .then(()=>{
      return Feature.create(feature)
    })
    .then((feature)=>{
      console.log("Feature Created", feature)
    })
    .catch(()=>{
      console.log("Feature Creation error")
    })
  })
};