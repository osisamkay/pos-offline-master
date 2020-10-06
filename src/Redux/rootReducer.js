import {actionType} from '../Action/ActionType';
import AsyncStorage from '@react-native-community/async-storage';

const {REG_USER, LOG_USER_OUT} = actionType;

const initialState = {
  isLogged: false,
  isReg: false,
  //   userData: {},
  userToken: {},
  //   isError: false,
  //   recovered: false,
  //   loading: false,
  //   tailor_category_id: 0,
  //   collected_data: null,
  //   agg: 0,
  //   mediaData: {},
};

export const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case REG_USER:
      return {
        ...state,
        userToken: payload,
        // loading: true,
        isReg: true,
      };
    case LOG_USER_OUT:
      return {
        ...state,

        isReg: false,
      };

    default:
      return state;
  }
};
