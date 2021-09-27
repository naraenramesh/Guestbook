import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { EntryModel } from "./entry-model";
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-reducer';
import { map, switchMap, take } from "rxjs/operators";
import { Actions, ofType } from "@ngrx/effects";
import * as EntryActions from './entry-store/entry-actions'


@Injectable({providedIn:'root'})
export class EntryResolver implements Resolve<{entries:EntryModel[]}>{

    constructor(private store:Store<fromApp.AppState>,private actions$:Actions){

    }
      resolve( ars:ActivatedRouteSnapshot, rss:RouterStateSnapshot)
      {
    
      return this.store.select('entry').pipe(take(1),map(entrystate=>entrystate.entries),
      switchMap(entries=>{
        if(entries.length === 0)
        {
          this.store.dispatch(EntryActions.fetchEntries({pageNumber:1}))
          return this.actions$.pipe(ofType(EntryActions.setEntries))
        }
        else{
          return of({entries})
        }
      }))
    }
   
  }
