import { Component, ElementRef, OnDestroy, OnInit,HostListener } from '@angular/core';

import { FEDashboardContainerModel } from '../../domain/models/fe-dashboard-container.model';
import { FELigDashboardModel} from '../../domain/models/fe-lig-dashboard.model';
import { LigDataModel } from '../../domain/models/lig-data.model'

import { LigFormFilterControlService3 } from '../../services/lig-form-filter-controls-3.service';



@Component({
  selector: 'app-dashboard-container',
  templateUrl: './fe-dashboard-container.component.html',
  styleUrls: ['./fe-dashboard-container.component.css'],
  providers:[ LigFormFilterControlService3, FEDashboardContainerModel,
     FELigDashboardModel, LigDataModel ] //LigFormFilterControlService , LigFormFilterControlService2
})
export class FEDashboardContainerComponent implements OnInit, OnDestroy {



  constructor(private feDashboardContainerModel : FEDashboardContainerModel) { }

  get isShowTableLoader():boolean{
    return this.feDashboardContainerModel.isShowTableLoader
  }
  ngOnInit(): void {
    this.feDashboardContainerModel.init();
  }
  ngOnDestroy():void{
    this.feDashboardContainerModel.destroy();
  }

}
