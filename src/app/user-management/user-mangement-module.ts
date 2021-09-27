import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserManagementComponent } from "./user-management.component";

const umModule=[{
    path:'',component:UserManagementComponent
}]


@NgModule({imports:[RouterModule.forChild(umModule)]})

export class UserManagementModule{}