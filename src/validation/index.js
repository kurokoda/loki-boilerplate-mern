/* eslint-disable no-confusing-arrow */

// https://spin.atomicobject.com/2016/10/05/form-validation-react/

export default {
  set: (field, name, ...validations) => state => {
    for (const v of validations) {
      const errorMessageFunc = v(state[field], state);
      if (errorMessageFunc) {
        return { [field]: errorMessageFunc(name) };
      }
    }
    return null;
  },
  run: (state, runners) =>
    runners.reduce((memo, runner) => Object.assign(memo, runner(state)), {})
};
