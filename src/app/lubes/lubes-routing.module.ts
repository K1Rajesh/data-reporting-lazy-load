import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LubesComponent } from './components/lubes/lubes.component'
import { LigComponent } from './components/lig/lig.component'



const routes: Routes = [
  {
    path:'', component: LubesComponent,
    children:[
      {
        path: 'lig', component: LigComponent,
      },
      // {
      //   path:'logs',
      //   component: LogsComponent,
      //   children:[
      //     {
      //       path: 'ui-log/:sessionId',
      //       component: UiLogsComponent,
      //     },
      //     {
      //         path : 'Show distinct users',
      //         component : DistinctUserComponent
      //     },
      //     {
      //       path:'Reports accessed count',
      //       component: ReportsAccessedCountComponent   
      //     },
      //     {
      //       path:'User Activity Log',
      //       component: ActivityLogsComponent
      //     }
      // ]
      // },
      // {
      //   path: 'indexing',
      //   component: IndexingReportComponent,
      // }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LubesRoutingModule {
  
 }
