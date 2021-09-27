import { createAction, props } from "@ngrx/store";
import { User } from "../auth-model";

export const loginlocal=createAction('[User]Login',props<{
  user:User
}>())

export const signup=createAction('[User]Signup',props<{
  user:FormData
}>())


export const login=createAction('[User]LogintoDB',props<{
    user:User
    }>())
    
    export const changePassword=createAction('Change password',props<{
      password:String
      }>())

      export const changeProfilePicture=createAction('Change Profile Picture',props<{
        picture:FormData
        }>())

        
      
        export const changeUserPrivilege=createAction('Change User Privilege',props<{
          email:String,
          privilege:String
          }>())

          export const changeProfilePicturelocal=createAction('Change Profile Picture',props<{
            picture:String
            }>())

    export const autologin=createAction('[User]Auto Login')
    
    export const autologout=createAction('[User] Auto Logout');
    
    export const logout=createAction('[User]Logout')
    export const logoutlocal=createAction('[User]Logout in frontend')