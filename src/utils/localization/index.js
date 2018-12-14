export const localized = (manifest, target) => {
  let result = 'LOCALIZATION ERROR';
  if (typeof target === 'string') {
    result = manifest.get(target) || 'NOT LOCALIZED';
  } else if (Array.isArray(target)) {
    result = manifest.getIn(target) || 'NOT LOCALIZED';
  }
  return result;
}