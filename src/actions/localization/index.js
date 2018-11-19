export const HYDRATE_LOCALIZATION_DATA = 'HYDRATE_LOCALIZATION_DATA';

// TODO Add JSDoc comments
export function hydrateLocalizationData(payload) {
  return {
    payload,
    type: HYDRATE_LOCALIZATION_DATA
  };
}
