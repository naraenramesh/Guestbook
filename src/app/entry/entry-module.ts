import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EntryRoutingModule } from "./entry-routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromEntry from './entry-store/entry-reducer';
import {MatGridListModule} from '@angular/material/grid-list';
import { EntryEffects } from "./entry-store/entry-effects";
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from "@angular/material/dialog";
import { AuthInterceptor } from "../auth/auth-interceptor";
import { EntryResolver } from "./entry-resolver";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ErrorInterceptor } from "../shared/error-interceptor";

@NgModule({
    imports:[
        EntryRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatGridListModule,
        MatSnackBarModule,
        StoreModule.forFeature('entry',fromEntry.EntryReducer),
        EffectsModule.forFeature([EntryEffects])
    ],providers:[EntryResolver,{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }]

})
export class EntryModule{}