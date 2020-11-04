import {
  USER_LOGIN
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
