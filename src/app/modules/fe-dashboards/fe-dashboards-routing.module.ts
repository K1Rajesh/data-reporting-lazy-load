import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigDashboardComponent } from './components/lig-dashboard/lig-dashboard.component';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component'

const dashboardRoutes: Routes = [
  {
    path:'lig-dashboard',
    component: LigDashboardComponent
  },
  {
    path:'lig-dashboard-container',
    component: DashboardContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class FEDashBoardsRoutingModule { }
