const ordinals = {};

export const getIncrementedElementName = name => {
  ordinals[name] = ordinals[name] ? ordinals[name] + 1 : 1;
  const output = `${name}_${ordinals[name]}`;
  return output;
};
