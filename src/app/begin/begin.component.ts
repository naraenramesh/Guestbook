import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../../app/app-store/app-reducer'
import * as AuthActions from '../auth/auth-store/auth-actions';
import { mimeType } from '../shared/mime-type.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.css']
})
export class BeginComponent implements OnInit {
  isAuthenticated=false;
  uname;
  profile_picture;
  admin_trigger=false;
  imagePreview
  photo;
  file;
  picForm:FormGroup;
    constructor(private store:Store<fromApp.AppState>,private rs:Router) { }
  
   
    async ngOnInit() {
    
      this.picForm=new FormGroup({
        picture: new FormControl(null,{validators:[Validators.required],asyncValidators:[mimeType]})
      })
      
      await this.store.select('auth').pipe(map(userstate=>userstate.user)).subscribe(user=>{
        if(user)
        {
        this.uname=user.username
       
        this.profile_picture=environment.S3_URL +'images/ProfilePictures/user_avatar.jfif'
       if(user.profile_picture)
       {
        this.profile_picture=environment.S3_URL+ user.profile_picture.toString().replace(/\\/g, "\/")

      }
          this.isAuthenticated=true
        if(user.privilege === 'Admin')
        {
          this.admin_trigger=true;
        }
        }
      })
    }
  
   
    MakeStatic(event){
      event.stopPropagation();
    }
    OnLogout(){
  this.store.dispatch(AuthActions.logout())
  this.isAuthenticated=false;
  this.admin_trigger=false;
  this.rs.navigate(['/auth'])
    }
  
    OnFileselect(evt:Event)
    {
      this.file=(event.target as HTMLInputElement).files[0]
      this.picForm.patchValue({picture:this.file})
      this.picForm.get('picture').updateValueAndValidity()
      const reader= new FileReader()
      
      reader.onload=()=>{
        this.imagePreview=reader.result
      }
      reader.readAsDataURL(this.file)
    }
    onSubmit(form:NgForm){
  this.store.dispatch(AuthActions.changePassword({password:form.value.password}))
    }
    OnSubmitPicture()
    {
      const formData=new FormData();
  if(this.file)
        {
  
          formData.append('picture',this.file)
            this.store.dispatch(AuthActions.changeProfilePicture({picture:formData}))
            this.imagePreview=null
        }
       
  
    }

}
