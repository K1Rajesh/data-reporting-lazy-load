import { Component, OnInit,ViewChild } from '@angular/core';

import { LigDashboardComponent} from './../lig-dashboard/lig-dashboard.component'

import { FEDashboardContainerModel } from './../../domain/models/fe-dashboard-container.model';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
  providers:[ FEDashboardContainerModel ]
})
export class DashboardContainerComponent implements OnInit {

  @ViewChild(LigDashboardComponent , {static : false}) ligDashboardComponent : LigDashboardComponent
  constructor(private feDashboardContainerModel : FEDashboardContainerModel) { }
  get isShowTableLoader():boolean{
    return this.feDashboardContainerModel.isShowTableLoader
  }
  ngOnInit(): void {
  }
  public getSourceDataclickHandler(){
    this.ligDashboardComponent.getSourceDataclickHandler();
  }
}
