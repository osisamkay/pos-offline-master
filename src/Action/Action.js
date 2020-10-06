import {actionType} from './ActionType';

const {REG_USER, LOG_USER_OUT} = actionType;

export const regUser = (payload) => ({
  payload,
  type: REG_USER,
});
export const logout = (payload) => ({
  payload,
  type: LOG_USER_OUT,
});
