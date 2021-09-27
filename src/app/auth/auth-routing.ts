import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

const authRoutes=[{
path:'',component:AuthComponent
}]

@NgModule({
    imports:[RouterModule.forChild(authRoutes)],
    exports:[RouterModule]
})

export class AuthRoutingModule
{}