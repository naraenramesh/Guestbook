import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { EntryModel } from "./entry-model";
import { EntryModule } from "./entry-module";


@Injectable({providedIn:'root'})

export class EntryService
{
    selected_entry=new BehaviorSubject<EntryModel>(null);
pagetrigger= new BehaviorSubject<number>(null);
    constructor(private http:HttpClient){}

    getEntryNames(all_trigger:boolean){
        if(all_trigger)
        {
        return this.http.get<any>(environment.BACKEND_URL + "api/getAllEntries")
        }
        else{
         return this.http.get<any>(environment.BACKEND_URL + "api/getUserEntries")
        }
       }
       
}