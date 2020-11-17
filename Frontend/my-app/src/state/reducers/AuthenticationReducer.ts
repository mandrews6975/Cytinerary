import {
  USER_LOGIN,
  USER_LOGOUT
} from "../ActionTypes"

const INITIAL_STATE: {
  userId: string | null,
  isAdmin: boolean | null
} = {
  userId: null,
  isAdmin: null
}

export default function AuthenticationReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, userId: action.payload[0], isAdmin: action.payload[1] == 'true' ? true : false };
    case USER_LOGOUT:
      return { ...state, userId: null, isAdmin: null };
    default:
      return state;
  }
}

export const ACTION_userLogin = (userInfo: any) => (
  {
    type: USER_LOGIN,
    payload: userInfo
  }
);

export const ACTION_userLogout = () => (
  {
    type: USER_LOGOUT
  }
);
