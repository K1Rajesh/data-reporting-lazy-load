import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { AuthGaurd } from './core/auth.gaurd';


const routes: Routes = [
  { 
    path:'login', component: LoginComponent,
    //canActivate: [LoginAuthGaurd],
    //outlet: 'unAuthenticated'
  },
  { 
    path:'home', 
    canActivate: [AuthGaurd],
    loadChildren: () => import('./authorized-user/authorized-user.module').then(m => m.AuthorizedUserModule)
  },
  { 
    path:'retail', 
    canActivate: [AuthGaurd],
    loadChildren: () => import('./retail/retail.module').then(m => m.RetailModule)
  },
  { 
    path:'lubes', 
    canActivate: [AuthGaurd],
    loadChildren: () => import('./lubes/lubes.module').then(m => m.LubesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
