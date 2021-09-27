
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-store/app-reducer';
import { EntryModel } from '../entry-model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EntryEditComponent } from '../entry-edit/entry-edit.component';
import * as EntryActions from "../entry-store/entry-actions";
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit   {

  constructor(private store:Store<fromApp.AppState>,
    private ru:ActivatedRoute, private rs: Router,private dialog:MatDialog, private es:EntryService) { }
  pageEvent: PageEvent;
datasource: EntryModel[];
length=0;
lcpy;
  pageSize = 2;
  entries_list = []
  paginator_need=true
  entries:EntryModel[];
  isLoading=true;
  all_trigger;
  url=environment.S3_URL

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {

    this.rs.routeReuseStrategy.shouldReuseRoute = () => false;
    if(this.rs.url.split('/')[2] === 'all')
    {
this.all_trigger=true
    }
    else{
this.all_trigger=false;
    }


    this.es.selected_entry.subscribe(entry=>{
      if(entry)
      {
      this.entries_list=[entry]
      this.paginator_need=false
        }
        else{
          this.store.select('entry').subscribe(
            entriesraw=>{
              if(entriesraw.totalEntries !== 0)
              { 
                this.entries_list=entriesraw.entries;
                this.length=entriesraw.totalEntries

              if(entriesraw.entries.length > 0)
              { 
              this.paginator_need=true
                }
          }

          }) 
        }
  })

  this.es.selected_entry.next(null)
   }
  
   OnEdit(index:number){
     

     this.dialog.open(EntryEditComponent,{
       data:this.entries_list[index]
       
     })
   }
   OnDelete(index:number){
     const eId=this.entries_list[index].entryId
     if(this.paginator.hasPreviousPage && this.paginator.getNumberOfPages() === this.paginator.pageIndex + 1 && this.entries_list.length % 2 !== 0)
     {
       this.paginator.pageIndex=this.paginator.pageIndex - 1;
       this.length=this.length - 1;
     }
     if(this.all_trigger)
     {
 
      this.store.dispatch(EntryActions.deleteEntry({entryId:eId,pageNumber:this.paginator.pageIndex+1,trigger:"all"}))
    }
       else{
        this.store.dispatch(EntryActions.deleteEntry({entryId:eId,pageNumber:this.paginator.pageIndex+1}))
      }
    

     }

   OnApprove(index:number){
    const eId=this.entries_list[index].entryId

    this.store.dispatch(EntryActions.approveEntry({entryId:eId}))
  }
   onPageChanged() {
    if(this.all_trigger)
    {

      this.store.dispatch(EntryActions.fetchAllEntries({pageNumber:this.paginator.pageIndex+1}))
     
    }
      else{
  
       this.store.dispatch(EntryActions.fetchEntries({pageNumber:this.paginator.pageIndex+1})) 
      }

    //  let entry1 = event.pageIndex * event.pageSize;
    //  let entry2 = entry1 + event.pageSize;
    //  this.entries_list = this.entries.slice(entry1, entry2);
   }
 }

