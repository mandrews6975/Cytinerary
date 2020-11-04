import {
  USER_LOGIN,
  USER_LOGOUT
} from "../ActionTypes"

const INITIAL_STATE : {
  userId: string | null
} = {
  userId: null
}

export default function AuthenticationReducer(state = INITIAL_STATE, action: any){
  switch(action.type){
    case USER_LOGIN:
      return {...state, userId:action.payload};
    case USER_LOGOUT:
      return {...state, userId:null};
    default:
      return state;
  }
}

export const ACTION_userLogin = (userId: string) => (
  {
    type: USER_LOGIN,
    payload: userId
  }
);

export const ACTION_userLogout = () => (
  {
    type: USER_LOGOUT
  }
);
