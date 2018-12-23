import features from './features';
import { getUsers } from './users';
import Feature from '../../schema/feature';
import User from '../../schema/user';


export const seed = () => {
  //seedFeatures();
  seedUsers();
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

export const seedUsers = () => {
  User.deleteMany({})
  .then(() => getUsers())
  .then((users)=>{
    users.forEach(user => {
      User.create(user)
    })
  })
  .catch( error =>{
    console.log("Feature Creation error")
  })
};