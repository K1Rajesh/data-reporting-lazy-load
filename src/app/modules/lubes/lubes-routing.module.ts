import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LubesComponent } from './components/lubes/lubes.component'
import { LigComponent } from './components/lig/lig.component'
import { LigContainerComponent} from './components/lig-container/lig-container.component'



const routes: Routes = [
  {
    path:'', component: LubesComponent,
    children:[
      {
        path: 'lig', component: LigContainerComponent,
      },
      {
        path:'logs',
        loadChildren: () => import('./../logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'indexing',
        loadChildren: () => import('./../misc-dashboards/misc-dashboards.module').then(m => m.MiscDashboardsModule)
      },{
        path:'fe-dashboards',
        loadChildren: () => import('./../fe-dashboards/fe-dashboards.module').then(m => m.FEDashboardsModule)
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LubesRoutingModule {
  
 }
