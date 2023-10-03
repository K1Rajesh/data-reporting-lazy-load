import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RetailComponent } from './components/retail/retail.component';
import { UfillComponent } from './components/ufill/ufill.component';



const routes: Routes = [
  {
    path:'', component: RetailComponent,
    children:[
      { 
        path:'ufill', component: UfillComponent,
      },
      {
        path:'logs',
        loadChildren: () => import('./../logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'indexing',
        loadChildren: () => import('./../misc-dashboards/misc-dashboards.module').then(m => m.MiscDashboardsModule)
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailRoutingModule {
  
 }
