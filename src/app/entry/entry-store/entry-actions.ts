import { createAction, props } from "@ngrx/store";
import { EntryModel } from "../entry-model";


export const setEntries=createAction('[Entry]Set Entries', props<{
    entries:EntryModel[],
    totalEntries:number
}>())

export const resetEntries=createAction('[Entry]Reset Entries')

export const fetchEntries=createAction('[Entry]Fetch Entries',props<{
    pageNumber:number
}>())



export const fetchAllEntries=createAction('[Entry]Fetch All Entries', props<{
    pageNumber:number
}>())

export const createEntrylocal=createAction('[Entry]Create Entry in frontend', props<{
    entry:EntryModel,
    totalEntries?:number
}>())


export const updateEntrylocal=createAction('[Entry]Update Entry in frontend', props<{
    entry:EntryModel,
    totalEntries?:number
}>())


export const deleteEntrylocal=createAction('[Entry]Delete Entry in frontend', props<{
    entryId:String,
    totalEntries?:number
}>())

export const createEntry=createAction('[Entry]Create Entry', props<{
    entry
}>())

export const updateEntry=createAction('[Entry]Update Entry', props<{
    entry:FormData
}>())


export const deleteEntry=createAction('[Entry]Delete Entry', props<{
    entryId:String,
    pageNumber:number,
    trigger?:String
}>())


export const approveEntry=createAction('[Entry]Approve Entry', props<{
    entryId:String
}>())

export const approveEntrylocal=createAction('[Entry]Approve Entry  in frontend', props<{
    entryId:String
}>())
