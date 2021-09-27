
import * as fromEntry from '../entry/entry-store/entry-reducer';
import * as fromAuth from '../auth/auth-store/auth-reducers'


export interface AppState{

    entry:fromEntry.entryState
    auth:fromAuth.authState
}