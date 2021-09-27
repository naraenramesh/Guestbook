import { createReducer, on, Action } from "@ngrx/store";
import { EntryModel } from "../entry-model";
import * as EntryActions from "./entry-actions";

export interface entryState{
    entries:EntryModel[],
    totalEntries:number
}

const initialState:entryState={
    entries:[
    //     {title: "Entry",
    // description: "New Entry",
    // approved: false,
    // creator: "60cf4cd5dc3f37284c24a823",
    // picture:"pic",
    //   entryId: "ET10200000000009"}
    ],
totalEntries:0
}

const _entryReducer=createReducer(initialState,
    on(EntryActions.resetEntries,(state,action)=>({
        entries:[],
        totalEntries:0
            })
            
            ),
             on(EntryActions.setEntries,(state,action)=>({
...state,
entries:[...action.entries],
totalEntries:action.totalEntries
    })
    
    ),
    on(EntryActions.createEntrylocal,(state,action)=>({
...state,
entries:state.entries.concat(action.entry).slice(0,2),
totalEntries:state.totalEntries + 1
    })),
    
    on(EntryActions.updateEntrylocal,(state,action)=>({
        ...state,
        entries:state.entries.map((entry,index) => entry.entryId === action.entry.entryId ? action.entry: entry)
            })),
            
    on(EntryActions.deleteEntrylocal,(state,action)=>({
        ...state,
        entries:state.entries.filter((entry)=>entry.entryId !==action.entryId),
        totalEntries:state.totalEntries - 1
            })),
                      
    on(EntryActions.approveEntrylocal,(state,action)=>({
        ...state,
        entries:state.entries.map((entry,index) => entry.entryId === action.entryId ? {...entry,approved:true}:entry)
    
    }
              )),
    
    ) 


export function EntryReducer(state:entryState,action:Action)
{
return _entryReducer(state,action)
}