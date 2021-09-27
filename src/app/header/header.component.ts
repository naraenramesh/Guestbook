import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../app/app-store/app-reducer'
import * as AuthActions from '../auth/auth-store/auth-actions';
import { mimeType } from '../shared/mime-type.validator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
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
  
     
      this.profile_picture=environment.S3_URL + user.profile_picture.toString().replace(/\\/g, "\/")
     
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
