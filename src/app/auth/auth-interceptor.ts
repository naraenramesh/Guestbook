import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take,map, exhaustMap, finalize } from "rxjs/operators";
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-reducer';
import { LoadingService } from "../shared/loading-spinner/loading-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  timer
  constructor(private store:Store<fromApp.AppState>,private ls:LoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   
    if(this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() =>  this.ls.loading_triggger.next(true), 100);

    return this.store.select('auth').pipe(map(userdata=>userdata.user),
      take(1),
      exhaustMap(user => {
   
        if (!user) {
          return next.handle(req).pipe(finalize(() => {
            this.ls.loading_triggger.next(false)
            if(this.timer){
              clearTimeout(this.timer);
            }
          }));
        }
        
        const modifiedReq = req.clone({
            params: new HttpParams().set('userId', user.userId.toString()),
          headers: new HttpHeaders().set('Authorization', user.token.toString())
          
        });
        return next.handle(modifiedReq).pipe(finalize(() => {
          this.ls.loading_triggger.next(false)
          if(this.timer){
            clearTimeout(this.timer);
          }
        }));
      })
    );
  }


  
}