import { disableScroll, enableScroll } from '../../utils/browser'

export const SET_COLLAPSED_HEADER_MENU_OPEN = 'SET_COLLAPSED_HEADER_MENU_OPEN';

// TODO Add JSDoc comments
export function setCollapsedHeaderMenuOpen(payload) {
  const isMenuOpen = payload.isCollapseHeaderMenuOpen;

  isMenuOpen ? disableScroll() : enableScroll();

  return {
    payload,
    type: SET_COLLAPSED_HEADER_MENU_OPEN
  };
}
