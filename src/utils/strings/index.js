export const localize = (manifest, target) => {
  let result = 'LOCALIZATION ERROR';
  if (typeof target === 'string') {
    result = manifest.get(target) || 'NOT LOCALIZED';
  } else if (Array.isArray(target)) {
    result = manifest.getIn(target) || 'NOT LOCALIZED';
  }
  return result;
};

// TODO create a function which sanitizes text for use with dangerouslySetInnerHTML
export const sanitizeHTML = () => {};
