import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexingReportComponent } from './indexing-report/indexing-report.component';



const routes: Routes = [
  {
    path:'', component: IndexingReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscDashboardsRoutingModule {
  
 }
