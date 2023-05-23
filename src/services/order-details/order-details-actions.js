import { MODAL_ANIMATION_TIME } from '../../constants/constants';
export const ORDER_DETAILS_OPEN_MODAL = 'ORDER_DETAILS_OPEN_MODAL';
export const ORDER_DETAILS_CLOSE_MODAL = 'ORDER_DETAILS_CLOSE_MODAL';
export const ORDER_DETAILS_SET_DATA = 'ORDER_DETAILS_SET_DATA';
export const ORDER_DETAILS_REMOVE_DATA = 'ORDER_DETAILS_REMOVE_DATA';

export function openOrderDetailsModal(orderData) {
  return function (dispatch) {
    dispatch({
      type: ORDER_DETAILS_SET_DATA, payload: {
        order: orderData
      }
    });
    dispatch({ type: ORDER_DETAILS_OPEN_MODAL, payload: {} });
  }
};

export function closeOrderDetailsModal(goToPage) {
  return function (dispatch) {
    dispatch({ type: ORDER_DETAILS_CLOSE_MODAL, payload: {} });
    setTimeout(() => {
      dispatch({ type: ORDER_DETAILS_REMOVE_DATA, payload: {} });
      goToPage();
    }, MODAL_ANIMATION_TIME);
  };
};