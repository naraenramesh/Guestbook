import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as Useractions from './auth-actions';
import * as fromApp from '../../app-store/app-reducer'
import { Store } from '@ngrx/store';

@Injectable({providedIn:'root'})
export class AuthEffects{
  expiration_trigger;
userdata=null;

constructor(private http:HttpClient,private actions$:Actions, 
  private store:Store<fromApp.AppState>,private rs:Router,private ru:ActivatedRoute)
{}

signup$= createEffect(()=>
this.actions$.pipe(ofType(Useractions.signup),exhaustMap((action)=>{
    
    return this.http.post<any>(environment.BACKEND_URL + "api/signup", 
  action.user)
}),map(user=>{
if(user.status =200)
{
   this.rs.navigate(['/'])
}
})),{dispatch:false}
)

usercopy=null;




login$=createEffect(()=>
this.actions$.pipe(ofType(Useractions.login),exhaustMap((action)=>{
  this.usercopy={email:action.user.email, password:action.user.password}

  return this.http.post<any>(environment.BACKEND_URL + "api/login", 
  action.user).pipe(map(usersraw=>{
    return {
      
            userId:usersraw.user._id,
            username:usersraw.user.username,
            token:usersraw.user.token,
            email:usersraw.user.email,
            profile_picture:usersraw.user.profile_picture,
            privilege:usersraw.user.privilege
        }

}))
}),map(user=>{
  if(user)
   {
     const exp_time=new Date(new Date().getTime() + 3600000 )
     const userdet={userId:user.userId,token:user.token,expiresIn:exp_time}
localStorage.setItem('userdata',JSON.stringify(userdet));


this.expiration_trigger=setTimeout(()=>{ return this.store.dispatch(Useractions.logout())},3600000);

    return Useractions.loginlocal({user:user})

  }
  else{
    {dispatch:false}
  }
}),tap(()=>{

  this.rs.navigate(['/entry'])
})

)
)


autologin$=createEffect(()=>
this.actions$.pipe(ofType(Useractions.autologin),exhaustMap(()=>{

  this.userdata= JSON.parse(localStorage.getItem('userdata'))

  if(this.userdata)
  {
  return this.http.post<any>(environment.BACKEND_URL + "api/tokencheck",{token:this.userdata.token, userId:this.userdata.userId}).pipe(map(usersraw=>{
    return {
      
            userId:usersraw.user._id,
            username:usersraw.user.username,
            token:usersraw.user.token,
            email:usersraw.user.email,
            profile_picture:usersraw.user.profile_picture,
            privilege:usersraw.user.privilege
        }

}))
  }
})
,map(user=>{
  if(user)
   {
     
const expiration_Time =
    new Date(this.userdata.expiresIn).getTime() -
    new Date().getTime();

this.expiration_trigger=setTimeout(()=>{
  return this.store.dispatch(Useractions.logout())},expiration_Time);
    return Useractions.loginlocal({user:user})

  }
  else{
    {dispatch:false}
  }
}),tap(()=>{
  this.rs.navigate(['../../entry'])
})

)
)



logout$=createEffect(()=>
this.actions$.pipe(ofType(Useractions.logout),map(()=>{
  clearTimeout(this.expiration_trigger);
   localStorage.removeItem('userdata');
   this.rs.navigate(['/auth'])
    return Useractions.logoutlocal()
    
})
))



changePassword$= createEffect(()=>
this.actions$.pipe(ofType(Useractions.changePassword),exhaustMap((action)=>{
    
    return this.http.post<any>(environment.BACKEND_URL + "api/changePassword",{password:action.password})
}),map(entry=>{
return Useractions.logout()
}))
)



changeProfilePicture$= createEffect(()=>
this.actions$.pipe(ofType(Useractions.changeProfilePicture),exhaustMap((action)=>{
    
    return this.http.post<any>(environment.BACKEND_URL + "api/changeProfilePicture",action.picture)
    .pipe(map(picturestate=>{
      return {
        profile_picture:picturestate.imagePath
      }
    }

    ))
}),map(picture=>{
  return Useractions.changeProfilePicturelocal({picture:picture.profile_picture})
  }))
  )


changeUserPrivilege$= createEffect(()=>
this.actions$.pipe(ofType(Useractions.changeUserPrivilege),exhaustMap((action)=>{
    
    return this.http.post<any>(environment.BACKEND_URL + "api/changePrivilege",action)
}),map(entry=>{
if(entry.status =200)
{
}
})),{dispatch:false}
)

}
