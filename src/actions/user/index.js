export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

// TODO Add JSDoc comments
export function signIn(props, onSuccess, onError) {
  const url = `${process.env.REACT_APP_KLAW_API_BASE_URL}/api/auth/signIn`;

  return dispatch => {
    dispatch({
      type: SIGN_IN
    });

    fetch(url, {
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
      .then(
        res =>
          res.ok ? Promise.resolve(res.json()) : Promise.reject(res.status)
      )
      .then(payload => {
        dispatch({
          payload,
          type: SIGN_IN_SUCCESS
        });
        if (typeof onSuccess === 'function') {
          onSuccess(payload);
        }
      })
      .catch(error => {
        dispatch({
          error,
          type: SIGN_IN_ERROR
        });
        if (typeof onError === 'function') {
          onError(error);
        }
      });
  };
}

// TODO Add JSDoc comments
export function signOut() {
  return {
    type: SIGN_OUT
  };
}

export function signUp(props, onSuccess, onError) {
  const url = `${process.env.REACT_APP_KLAW_API_BASE_URL}/api/auth/signUp`;

  return dispatch => {
    dispatch({
      type: SIGN_UP
    });

    fetch(url, {
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
      .then(res => (res.ok ? Promise.resolve(res) : Promise.reject(res.status)))
      .then(payload => {
        dispatch({
          payload,
          type: SIGN_UP_SUCCESS
        });
        if (typeof onSuccess === 'function') {
          onSuccess(payload);
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          error,
          type: SIGN_UP_ERROR
        });
        if (typeof onError === 'function') {
          onError(error);
        }
      });
  };
}
