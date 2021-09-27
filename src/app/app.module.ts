import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { EntryEditComponent } from './entry/entry-edit/entry-edit.component';
import { EntryListComponent } from './entry/entry-list/entry-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { EntryResolver } from './entry/entry-resolver';
import { AuthEffects } from './auth/auth-store/auth-effects';
import * as fromAuth from "./auth/auth-store/auth-reducers"
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ErrorInterceptor } from './shared/error-interceptor';
import { AvatarModule } from 'ngx-avatar';
import { LoadingComponent } from './shared/loading-spinner/loading-spinner';
import { BeginComponent } from './begin/begin.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    BeginComponent,
    EntryListComponent,
    EntryEditComponent,
    UserManagementComponent,
    AuthComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([EffectsModule]),
    StoreModule.forFeature('auth',fromAuth.AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
    MatPaginatorModule,
    MaterialFileInputModule,
    MatListModule,
    AvatarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatGridListModule,
ReactiveFormsModule,
MatToolbarModule,
MatSidenavModule,
BrowserModule,
BrowserAnimationsModule
  ],
  providers: [EntryResolver, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
