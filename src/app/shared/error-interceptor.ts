import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { EntryService } from "../entry/entry-service";
import { LoadingService } from "./loading-spinner/loading-service";
import { Snackbar } from "./snackbar";


@Injectable({providedIn:'root'})

export class ErrorInterceptor implements HttpInterceptor
{
    constructor(private snackbar: Snackbar, private ls: LoadingService,private es:EntryService) {}

   
    

    intercept(req:HttpRequest<any>, next:HttpHandler)
    {   
        
        return next.handle(req)
      .pipe(map((event: HttpResponse<any>) => {
          if(event.body)
          {
           // this.ls.loading_triggger.next(false);
     if(event.body.message)
     {
       this.snackbar.openSnackBar(event.body.message,'Hurray')

        }
        }
        return event
        }),
        catchError((error: HttpErrorResponse) => {
    
            if(error.error){
          //    this.ls.loading_triggger.next(false);
            if(error.error.message)
            {
       
          this.snackbar.openSnackBar(error.error.message,'Oops')
             
            }
            else{
                this.snackbar.openSnackBar('Error Occured','Oops')
        
            }
        }
          return throwError(error)
        })
      )
    }
 
}