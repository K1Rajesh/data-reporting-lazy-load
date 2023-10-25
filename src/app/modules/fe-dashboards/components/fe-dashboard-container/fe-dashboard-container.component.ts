import { Component, OnInit,ViewChild } from '@angular/core';

import { FELigDashboardComponent} from '../fe-lig-dashboard/fe-lig-dashboard.component'

import { FEDashboardContainerModel } from '../../domain/models/fe-dashboard-container.model';

//import { LigFormFilterControlService } from './../../services/lig-form-filter-controls.service';
//import { LigFormFilterControlService2 } from '../../services/lig-form-filter-controls-2.service';
import { LigFormFilterControlService3 } from '../../services/lig-form-filter-controls-3.service';


import { FELigDashboardModel} from '../../domain/models/fe-lig-dashboard.model';
import { LigDataModel } from '../../domain/models/lig-data.model'


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './fe-dashboard-container.component.html',
  styleUrls: ['./fe-dashboard-container.component.css'],
  providers:[ LigFormFilterControlService3, FEDashboardContainerModel,
     FELigDashboardModel, LigDataModel ] //LigFormFilterControlService , LigFormFilterControlService2
})
export class FEDashboardContainerComponent implements OnInit {

  @ViewChild(FELigDashboardComponent , {static : false}) FELigDashboardComponent : FELigDashboardComponent
  constructor(private feDashboardContainerModel : FEDashboardContainerModel) { }
  get isShowTableLoader():boolean{
    return this.feDashboardContainerModel.isShowTableLoader
  }
  ngOnInit(): void {
  }
  // public getSourceDataclickHandler(){
  //   this.FELigDashboardComponent.getSourceDataclickHandler();
  // }
}
