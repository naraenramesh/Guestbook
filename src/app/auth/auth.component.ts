import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { mimeType } from '../shared/mime-type.validator';
import * as fromApp from '../../app/app-store/app-reducer'
import { Store } from '@ngrx/store';
import * as AuthActions from './auth-store/auth-actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
signuptrigger:Boolean
imagePreview;
authForm:FormGroup;
file;
hide;
  isLoading = false;
    error: string = null;


    constructor(private router: Router,private route: ActivatedRoute,private store:Store<fromApp.AppState>)
 {}
g;
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      
    let username:String;
let password:String;
let email:String;
    this.signuptrigger=false;
    this.authForm=new FormGroup({
      username:new FormControl (username),
      email:new FormControl (email,[Validators.required]),
      password:new FormControl (password,[Validators.required]),
      profile_picture:new FormControl (null),


    })
  }

  triggerSignup()
  {
    this.signuptrigger=true
  }



    OnSubmit() {
  
    if(this.signuptrigger)
    {
const signupformdata = new FormData();
signupformdata.append('picture',this.authForm.get('profile_picture').value);
signupformdata.append('username',this.authForm.get('username').value);
signupformdata.append('email',this.authForm.get('email').value);
signupformdata.append('password',this.authForm.get('password').value);

    this.store.dispatch(AuthActions.signup({user:signupformdata}))
    }
    else{
      this.store.dispatch(AuthActions.login({user:
        {email:this.authForm.get('email').value,password:this.authForm.get('password').value}
    }))
      
    }
  }


    
    
  
  OnFileselect(event:Event){
    this.file=(event.target as HTMLInputElement).files[0]
   this.authForm.patchValue({profile_picture:this.file})
   this.authForm.get('profile_picture').updateValueAndValidity()
 
  const reader= new FileReader()
   
   reader.onload=()=>{
     this.imagePreview=reader.result
   }
   reader.readAsDataURL(this.file)
         }
    }




