import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn:'root'})

export class Snackbar{
constructor(private _snackbar:MatSnackBar){}

openSnackBar(message: string, action: string,classname?:string) {   
    this._snackbar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [classname],
    });
  }
}