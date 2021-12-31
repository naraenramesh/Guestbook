import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-reducer';


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
  constructor( private store:Store<fromApp.AppState>,private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):    | boolean| UrlTree| Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
  
      map(userstate => {
          if(userstate){
        const isAuth = !!userstate.user;
        if (isAuth) {
          return true;
        }
    }
    else{
      if(localStorage.getItem('userdata')===null)
      {
      return this.router.createUrlTree(['/auth']);
      
      }
    }})
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}