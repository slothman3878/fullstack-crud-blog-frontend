import {IAction} from '../common/types';

class AuthState {
  loading: boolean = true;
  user: undefined|{
    id: string;
    email: string;
    isWriter: boolean;
    isAdmin: boolean;
  } = undefined;
}

export default function auth(state: AuthState=new AuthState(), action: IAction) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case 'DELETE_CURRENT_USER':
      return {
        ...state,
        loading: false,
        user: undefined
      }
    default:
      return state
  }
}