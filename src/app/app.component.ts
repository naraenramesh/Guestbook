import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './app-store/app-reducer'
import * as AuthActions from './auth/auth-store/auth-actions';
import { LoadingService } from './shared/loading-spinner/loading-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Guestbook';
loading_trigger:Boolean;
  constructor(private store:Store<fromApp.AppState>,private ls:LoadingService){}

  async ngOnInit()
  {
    this.loading_trigger=false
 await this.store.dispatch(AuthActions.autologin())
 this.ls.loading_triggger.subscribe(trigger=>{
  setTimeout(()=> {
    this.loading_trigger=trigger;
}, 0);
  
 })
  }
}
