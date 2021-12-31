
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-reducer';
import { EntryModel } from './entry-model';
import * as EntryActions from "./entry-store/entry-actions";
import { EntryEditComponent } from './entry-edit/entry-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EntryService } from './entry-service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
enable_detail=false;
list_colspan=4;
 UpdateForm:NgForm;
filteredOptions;
myControl=new FormControl();
isLoading:false;
userlist;
userdump
email;
all_trigger=false;
reset;
constructor(private store:Store<fromApp.AppState>,private dialog:MatDialog,private ru:ActivatedRoute,
  private router:Router,private es:EntryService) { }
entries:EntryModel[];
  async ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
 this.store.dispatch(EntryActions.resetEntries())

 this.RefreshEntries()
  this.store.select('entry').subscribe(entriesraw=>{
    if(entriesraw.totalEntries !== 0)
    { 
    this.es.getEntryNames(this.all_trigger).subscribe(entryextract=>{
      this.userdump=entryextract.entries
      this.userlist=this.userdump.map(entryquery=>entryquery.title)
     
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      
     });
    }
  })

}

RefreshEntries()
{
  if(this.router.url.split('/')[2] === 'all')
{
  console.log('fd')
   this.store.dispatch(EntryActions.fetchAllEntries({pageNumber:1})) 
  this.all_trigger=true
}
  else{
    this.store.dispatch(EntryActions.fetchEntries({pageNumber:1})) 
  }

}
 OnAddEntry()
 {
   this.dialog.open(EntryEditComponent)
 }

 @ViewChild('UpdateForm') updform:NgForm

 private _filter(value: string) {
   const filterValue = value.toLowerCase();
   return this.userlist.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
 }
 
 Onselectentry(evt:any)
 {
   const sel_entry= this.userdump.find(entry=>entry.title===evt.option.value)
  this.reset=true;
this.es.selected_entry.next(sel_entry)
 }
 
 OnReset()
 {
  this.es.selected_entry.next(null)
  this.RefreshEntries()
  this.myControl.reset('')
  this.reset=false;
 }
}
