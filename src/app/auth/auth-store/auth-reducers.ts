import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../auth-model";
import * as AuthActions from './auth-actions';

export interface authState{
    user:User
}

const userlocal=null
   
   const initialstate:authState={user:null};
   //const pack=[{username:'max',password:'max'}];
   
   const  _authreducer= createReducer(initialstate,
     on(AuthActions.loginlocal,(state,action)=>({
   ...state,
   user:action.user
     })
   
     ),on(AuthActions.logoutlocal,(state,action)=>({
       ...state,
       user:null
     })),on(AuthActions.changeProfilePicturelocal,(state,action)=>(
      {
      ...state,
      user: {...state.user, profile_picture:action.picture}
        }))
        )
   
     export function AuthReducer(state:authState,action:Action)
     {
       return _authreducer(state,action)
     }
   