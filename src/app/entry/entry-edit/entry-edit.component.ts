import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-store/app-reducer';
import { EntryModel } from '../entry-model';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as EntryActions from "../entry-store/entry-actions";
import {mimeType} from "../../shared/mime-type.validator";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})


export class EntryEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:EntryModel,
  private ru:Router, private store:Store<fromApp.AppState>) { }
entryForm:FormGroup;
file;
imagePreview;
edit_trigger:Boolean;
host= environment.S3_URL;
ngOnInit() {
      this.edit_trigger=false;
  if(this.data)
  {
  this.edit_trigger=true;
  }
  this.initForm();
  
    }
  
     initForm()
    {
  let  title:String;
  let  description:String;
  let  picture=null;
 
  
  if(this.edit_trigger)
  {
    title=this.data.title;
    description=this.data.description;
    picture=this.data.picture;
    }
  
  
    this.entryForm =new FormGroup({
  title:new FormControl(title,[Validators.required]),
  description:new FormControl(description,[Validators.required]),
  picture:new FormControl(picture,
    {asyncValidators:[mimeType]}
    ),
        })
      }
  

      OnFileselect(event:Event){
 this.file=(event.target as HTMLInputElement).files[0]
this.entryForm.patchValue({picture:this.file})
this.entryForm.get('picture').updateValueAndValidity()

const reader= new FileReader()

reader.onload=()=>{
  this.imagePreview=reader.result
}
reader.readAsDataURL(this.file)
      }

  OnSubmit()
  {
const formData=new FormData();
if(this.file)
      {

        formData.append('picture',this.file)

      }
     
formData.append('title',this.entryForm.get('title').value)
formData.append('description',this.entryForm.get('description').value);

    if(this.edit_trigger)
    {
       formData.append('entryId',this.data.entryId.toString());
     
      this.store.dispatch(EntryActions.updateEntry({entry:formData}))
    
    }
    else{
      this.store.dispatch(EntryActions.createEntry({entry:formData}))
   
    }

  }

  }