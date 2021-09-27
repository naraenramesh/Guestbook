import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  
  {path:'',redirectTo:'/auth'
  ,pathMatch:'full'},
  { 
    path:'auth',loadChildren:()=>import('./auth/auth-module').then(module=>module.AuthModule)
},
  {
    path:'entry',loadChildren:()=>import('./entry/entry-module').then(module=>module.EntryModule),
  
  },
{path:'user-management',loadChildren:()=>import('./user-management/user-mangement-module').then(module=>module.UserManagementModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,   {
    onSameUrlNavigation: 'reload',
    enableTracing: true 
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
