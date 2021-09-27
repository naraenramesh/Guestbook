import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app-store/app-reducer"
import {Actions,ofType,createEffect} from "@ngrx/effects"
import * as EntryActions from "../entry-store/entry-actions";
import { switchMap,map, exhaustMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { EntryService } from "../entry-service";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class EntryEffects{

    constructor(private http:HttpClient,private es:EntryService,
        private ru:Router,private rs:ActivatedRoute, private store:Store<fromApp.AppState>,private actions$:Actions)
    {}
    
 fetchentries$= createEffect(()=>
this.actions$.pipe(ofType(EntryActions.fetchEntries),exhaustMap((action)=>{
    return this.http.get<any>(environment.BACKEND_URL + "api/getUserEntries/" + action.pageNumber +"/").pipe(map(entriesraw=>{
        if(entriesraw.entries.length > 0)
        {
        return entriesraw.entries.map(info=>{
            return {
                entryId:info.entryId,
                title:info.title,
                description:info.description,
                approved:info.approved,
                picture:info.picture,
                creator:info.creator,
                totalEntries:entriesraw.totalEntries
            }
        })
    }
    }))
}),map(entries=>{
   
    return EntryActions.setEntries({entries:entries,totalEntries:entries[0].totalEntries})
})
)
 )   

    
 fetchAllentries$= createEffect(()=>
this.actions$.pipe(ofType(EntryActions.fetchAllEntries),exhaustMap((action)=>{
    return this.http.get<any>(environment.BACKEND_URL + "api/getAllEntries/" + action.pageNumber +"/").pipe(map(entriesraw=>{
        if(entriesraw.entries.length > 0)
        {
        return entriesraw.entries.map(info=>{
            return {
                entryId:info.entryId,
                title:info.title,
                description:info.description,
                approved:info.approved,
                picture:info.picture,
                creator:info.creator,
                totalEntries:entriesraw.totalEntries
            }
        })
    }
    }))
}),map(entries=>{

    return EntryActions.setEntries({entries:entries,totalEntries:entries[0].totalEntries})
})
)
 )   

 createEntry$= createEffect(()=>

 this.actions$.pipe(ofType(EntryActions.createEntry),exhaustMap((action)=>{
    
    return this.http.post<any>(environment.BACKEND_URL + "api/createEntry",action.entry)
}),map(info=>{
if(info.entry)
{
   this.ru.navigate(['../entry'],{relativeTo:this.rs})
}
})),{dispatch:false}
)

 
 updateEntry$= createEffect(()=>
 this.actions$.pipe(ofType(EntryActions.updateEntry),exhaustMap((action)=>{
    
     return this.http.post<any>(environment.BACKEND_URL + "api/updateEntry",action.entry).pipe(map(info=>{
            return {
                entryId:info.entry.entryId,
                title:info.entry.title,
                description:info.entry.description,
                approved:info.entry.approved,
                picture:info.entry.picture,
                creator:info.entry.creator
            }
    }))
 }),map(entry=>{
    if(entry)
    {
    return EntryActions.updateEntrylocal({entry:entry})
    }
}))
 )

 
 pno;
trig;
 deleteEntry$= createEffect(()=>
 this.actions$.pipe(ofType(EntryActions.deleteEntry),exhaustMap((action)=>{
   this.pno=action.pageNumber
   this.trig=action.trigger
     return this.http.post<any>(environment.BACKEND_URL + "api/deleteEntry",{entryId:action.entryId})
 }),map(entry=>{
    if(entry.entryId)
    {

       this.ru.navigate(['../entry'],{relativeTo:this.rs})
        if(this.trig)
        {
           
    return EntryActions.fetchAllEntries({pageNumber:this.pno})
        }
        else{
            return EntryActions.fetchEntries({pageNumber:this.pno})
        }    
}
}))
 )


 approveEntry$= createEffect(()=>
 this.actions$.pipe(ofType(EntryActions.approveEntry),exhaustMap((action)=>{
 
     return this.http.post<any>(environment.BACKEND_URL + "api/approveEntry",{entryId:action.entryId})
}),map(entry=>{
    if(entry.entryId)
    {
    return EntryActions.approveEntrylocal({entryId:entry.entryId})
    }
}))
 )

}