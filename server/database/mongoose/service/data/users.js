import humps from 'humps';
import fetch from 'node-fetch';

export const getUsers = () => {
  return fetch('https://randomuser.me/api/?results=100&nat=us')
  .then(response => {
    return response.json();
  })
  .then((json) => {
    return json.results.map( result => (
        {
          firstName : humps.pascalize(result.name.first),
          lastName  : humps.pascalize(result.name.last),
          email     : result.email,
          username  : result.login.username,
          password  : 'password',
        }
      ))
  })
  .catch(error => {
    return Promise.reject(error);
  });
}