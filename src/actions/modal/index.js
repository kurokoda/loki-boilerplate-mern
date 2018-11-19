export const MODAL_HIDE = 'MODAL_HIDE';
export const MODAL_SHOW = 'MODAL_SHOW';

// TODO Add JSDoc comments
export function modalHide() {
  return {
    type: MODAL_HIDE
  };
}

// TODO Add JSDoc comments
export function modalShow(payload) {
  return {
    payload,
    type: MODAL_SHOW
  };
}
