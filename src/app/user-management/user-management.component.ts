import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../app/app-store/app-reducer'
import * as AuthActions from '../auth/auth-store/auth-actions';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private store:Store<fromApp.AppState>,private http:HttpClient) { }
  UpdateForm:NgForm;
  filteredOptions;
  myControl=new FormControl();
  isLoading:false;
  userlist;
  userdump
email;
  @ViewChild('UpdateForm') updform:NgForm
  ngOnInit() {
 this.getUserNames().subscribe(userextract=>{

  this.userdump=userextract.users
  this.userlist=this.userdump.map(userquery=>userquery.username)
 
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );

});

  }
  
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.userlist.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
  Onselectuser(evt:any){
this.email=this.userdump.filter(users=>users.username == evt.option.value)[0].email

  }
  OnUpdateUser(){
this.store.dispatch(AuthActions.changeUserPrivilege({email:this.email,privilege:this.updform.value.privilege}))
  }
  getUserNames(){
  
    return this.http.get<any>(environment.BACKEND_URL + "api/getUsers")
  }
}
