import { push } from 'connected-react-router';
import { setIsLoading } from '../../actions/application';
import { getConfigForType } from '../../utils/route';

export const FETCH_PAGE_DATA = 'FETCH_PAGE_DATA';
export const FETCH_PAGE_DATA_ERROR = 'FETCH_PAGE_DATA_ERROR';
export const FETCH_PAGE_DATA_SUCCESS = 'FETCH_PAGE_DATA_SUCCESS';
export const HYDRATE_PAGE_DATA = 'HYDRATE_PAGE_DATA';

/**
 * Action dispatched when page data fetch is requested
 * @returns {object} article of either type `FETCH_ABOUT_PAGE_DATA_SUCCESS` or of type `FETCH_ABOUT_PAGE_DATA_ERROR`
 */

export function fetchPageData(config, params, onSuccess, onError) {

  return dispatch => {
    dispatch({
      type: FETCH_PAGE_DATA
    });

    dispatch(setIsLoading({ isLoading: true }));

    const url = process.env.REACT_APP_KLAW_API_BASE_URL + config.getDataRoute(params);

    fetch(url)
      .then(
        response =>
          response.ok
            ? Promise.resolve(response.json())
            : Promise.reject(new Error('Invalid response in fetchPageData()'))
      )
      .then(payload => {
        dispatch({
          payload: Object.assign(payload, { pageType: config.type }),
          type: FETCH_PAGE_DATA_SUCCESS
        });
        dispatch(setIsLoading({ isLoading: false }));
        onSuccess();
      })
      .catch(error => {
        dispatch({
          error,
          type: FETCH_PAGE_DATA_ERROR
        });
        dispatch(setIsLoading({ isLoading: false }));
        onError(error);
      });
  };
}

export function navigateToPage(type, params, onSuccess, onError) {
  const config = getConfigForType(type);
  const pageUrl = config.getPageRoute(params);

  return dispatch => {
    if (config.getDataRoute) {
      dispatch({
        type: FETCH_PAGE_DATA
      });

      // Load the page data before navigating to the page
      dispatch(setIsLoading({ isLoading: true }));

      const baseUrl = process.env.REACT_APP_KLAW_API_BASE_URL;
      const dataUrl = `${baseUrl}${config.getDataRoute(params)}`;

      fetch(dataUrl)
        .then(
          response =>
            response.ok
              ? Promise.resolve(response.json())
              : Promise.reject(new Error('Invalid response in fetchPageData()'))
        )
        .then(payload => {
          // Navigate to the page
          dispatch({
            payload: Object.assign(payload, { pageType: type }),
            type: FETCH_PAGE_DATA_SUCCESS
          });
          dispatch(setIsLoading({ isLoading: false }));
          dispatch(push(pageUrl));
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch({
            error,
            type: FETCH_PAGE_DATA_ERROR
          });
          dispatch(setIsLoading({ isLoading: false }));
          if (onError && typeof onError === 'function') {
            onError();
          }
        });
    } else {
      // Navigate to the page
      dispatch(push(pageUrl));
    }
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
