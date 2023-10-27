import { Component, OnInit } from '@angular/core';

//import {LigFormFilterControlService} from '../../../fe-dashboards/services/lig-form-filter-controls.service'
import { LigFormFilterControlService2} from '../../../fe-dashboards/services/lig-form-filter-controls-2.service'
import { LigFormFilterControlService3} from '../../../fe-dashboards/services/lig-form-filter-controls-3.service'


import {FEDashboardContainerModel} from '../../../fe-dashboards/domain/models/fe-dashboard-container.model'
//import {LigDashboardModel3} from '../../../fe-dashboards/domain/models/lig-dashboard3.model'
import { LigDataModel } from '../../../fe-dashboards/domain/models/lig-data.model';

@Component({
  selector: 'app-lig-container',
  templateUrl: './lig-container.component.html',
  styleUrls: ['./lig-container.component.css'],
  providers:[  FEDashboardContainerModel, LigFormFilterControlService3, LigDataModel ] //LigDashboardModel3,LigFormFilterControlService, LigFormFilterControlService2
})
export class LigContainerComponent implements OnInit {

  constructor(private ligDataModel : LigDataModel) { }

  ngOnInit(): void {
    this.ligDataModel.init();
  }

}
