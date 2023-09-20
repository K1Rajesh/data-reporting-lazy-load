import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogsComponent } from './components/logs/logs.component'
import { ActivityLogsComponent } from './components/activity-logs/activity-logs.component';
import { DistinctUserComponent } from './components/activity-logs/distinct-user.component';
import { UiLogsComponent } from './components/ui-logs/ui-logs.component'
import { ReportsAccessedCountComponent } from './components/reports-accessed-count/reports-accessed-count.component'


const routes: Routes = [
    {
        path:'',
        component: LogsComponent,
        children:[
          {
            path: 'ui-log/:sessionId',
            component: UiLogsComponent,
          },
          {
              path : 'Show distinct users',
              component : DistinctUserComponent
          },
          {
            path:'Reports accessed count',
            component: ReportsAccessedCountComponent   
          },
          {
            path:'User Activity Log',
            component: ActivityLogsComponent
          }
      ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule {
  
 }

