export const LOG = 'LOG';

// TODO Add JSDoc comments
export function log(payload) {
  return dispatch => {
    dispatch({
      payload,
      type: LOG
    });

    const url = `${process.env.REACT_APP_KLAW_API_BASE_URL}/api/logging`;

    fetch(url, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
      .then(
        response =>
          response.ok
            ? Promise.resolve(response.json())
            : Promise.reject(new Error('Invalid response in log()'))
      )
      .then(payload => {
        console.log('Log:', payload);
      })
      .catch(error => {
        console.log('Log error: ', error);
      });
  };
}
