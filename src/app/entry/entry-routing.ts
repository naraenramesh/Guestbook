import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
import { EntryResolver } from "./entry-resolver";
import { EntryComponent } from "./entry.component";

const entryRoutes=[
    {
        path:'',component:EntryComponent,
       //resolve:[EntryResolver],
         canActivate:[AuthGuard],children:[{path:'all',component:EntryComponent}]
    }
]

@NgModule({
    providers:[EntryResolver],
    imports: [RouterModule.forChild(entryRoutes)],
    exports: [RouterModule]
  })

  export class EntryRoutingModule{}