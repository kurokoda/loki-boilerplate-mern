import Immutable from "immutable";

export const chunkArray = (input, size) => {
  const results = [];

  let output = input.slice();

  const isImmutable = Boolean(input.toJS);

  if (isImmutable) {
    output = output.toJS();
  }
  while (output.length) {
    results.push(output.splice(0, size));
  }
  return isImmutable ? Immutable.fromJS(results) : results;
};

const ordinals = {};

export const getIncrementedElementName = name => {
  ordinals[name] = ordinals[name] ? ordinals[name] + 1 : 1;
  const output = `${name}_${ordinals[name]}`;
  return output;
};
