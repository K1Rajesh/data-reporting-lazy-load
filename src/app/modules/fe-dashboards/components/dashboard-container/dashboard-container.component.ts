import { Component, OnInit,ViewChild } from '@angular/core';

import { LigDashboardComponent} from './../lig-dashboard/lig-dashboard.component'

import { FEDashboardContainerModel } from './../../domain/models/fe-dashboard-container.model';

import { LigFormFilterControlService } from './../../services/lig-form-filter-controls.service';

import { FELigDashboardModel} from '../../domain/models/fe-lig-dashboard.model';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
  providers:[ LigFormFilterControlService, FEDashboardContainerModel, FELigDashboardModel ]
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
