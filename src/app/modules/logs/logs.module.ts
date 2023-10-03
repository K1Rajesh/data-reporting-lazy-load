import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LogsRoutingModule } from './logs-routing.module'

import { LogsComponent } from './components/logs/logs.component'
import { ActivityLogsComponent } from './components/activity-logs/activity-logs.component';
import { DistinctUserComponent } from './components/activity-logs/distinct-user.component';
import { UiLogsComponent } from './components/ui-logs/ui-logs.component'
import { ReportsAccessedCountComponent } from './components/reports-accessed-count/reports-accessed-count.component'

import { SearchPipe } from './pipes/search.pipe'




@NgModule({
  declarations: [
    ActivityLogsComponent,
    DistinctUserComponent,
    LogsComponent,
    UiLogsComponent,
    ReportsAccessedCountComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    FormsModule
  ],
  exports:[
    ActivityLogsComponent,
    DistinctUserComponent,
    LogsComponent,
    UiLogsComponent,
    ReportsAccessedCountComponent
  ]
})
export class LogsModule { }
