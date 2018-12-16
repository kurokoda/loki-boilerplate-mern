export const HYDRATE_THEME_DATA = 'HYDRATE_THEME_DATA';

// TODO Add JSDoc comments
export function hydrateThemeData(payload) {
  return {
    payload,
    type: HYDRATE_THEME_DATA
  };
}
