import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { AuthRoutingModule } from "./auth-routing";
import * as fromAuth from './auth-store/auth-reducers'
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth-store/auth-effects";
import { ErrorInterceptor } from "../shared/error-interceptor";

@NgModule({
    imports:[AuthRoutingModule,
    StoreModule.forFeature('auth',fromAuth.AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule],
    providers:[ {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }]
})
export class AuthModule{}