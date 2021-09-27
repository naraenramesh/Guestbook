import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})




export class LoadingService{
    
loading_triggger= new BehaviorSubject<Boolean>(null);

}