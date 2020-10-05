import {actionType} from './ActionType';

const {REG_USER, LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER} = actionType;

export const regUser = (payload) => ({
  payload,
  type: REG_USER,
});
