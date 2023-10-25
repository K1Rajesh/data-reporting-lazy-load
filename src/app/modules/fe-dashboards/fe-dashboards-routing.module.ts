import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FELigDashboardComponent } from './components/fe-lig-dashboard/fe-lig-dashboard.component';
import { FEDashboardContainerComponent } from './components/fe-dashboard-container/fe-dashboard-container.component'

const dashboardRoutes: Routes = [
  {
    path:'',
    component: FEDashboardContainerComponent
  },
  {
    path:'lig-dashboard',
    component: FELigDashboardComponent
  },
  {
    path:'lig-dashboard-container',
    component: FEDashboardContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class FEDashBoardsRoutingModule { }
