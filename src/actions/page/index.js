import { getConfigForType } from '../../utils/route/index.js';

export const FETCH_PAGE_DATA = 'FETCH_PAGE_DATA';
export const FETCH_PAGE_DATA_ERROR = 'FETCH_PAGE_DATA_ERROR';
export const FETCH_PAGE_DATA_SUCCESS = 'FETCH_PAGE_DATA_SUCCESS';
export const HYDRATE_PAGE_DATA = 'HYDRATE_PAGE_DATA';

/**
 * Action dispatched when page data fetch is requested
 * @returns {object} article of either type `FETCH_ABOUT_PAGE_DATA_SUCCESS` or of type `FETCH_ABOUT_PAGE_DATA_ERROR`
 */

export function fetchPageData(type, onSuccess, onError) {
  const config = getConfigForType(type);

  return dispatch => {
    dispatch({
      type: FETCH_PAGE_DATA
    });

    const url = process.env.REACT_APP_KLAW_API_BASE_URL + config.api.pageData;

    fetch(url)
      .then(
        response =>
          response.ok
            ? Promise.resolve(response.json())
            : Promise.reject(new Error('Invalid response in fetchPageData()'))
      )
      .then(payload => {
        dispatch({
          payload: Object.assign(payload, { pageType: type }),
          type: FETCH_PAGE_DATA_SUCCESS
        });
        onSuccess();
      })
      .catch(error => {
        dispatch({
          error,
          type: FETCH_PAGE_DATA_ERROR
        });

        onError(error);
      });
  };
}

/**
 * Action dispatched when page data rehydration is ready
 * @param {string} pageType The response's data
 * @param {object} pageData The response's data
 * @returns {object} article of type `HYDRATE_PAGE_DATA`
 */
export function hydratePageData(pageType, pageData) {
  const type = HYDRATE_PAGE_DATA;
  const payload = { pageType, pageData };

  return {
    type,
    payload
  };
}
