import { Injectable, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { Router} from '@angular/router';

import { CONST_VALUES } from "../../../../core/constant-reources";

import { FELigDashboardFilterComponent } from '../../../fe-dashboards/components/fe-lig-dashboard-filter/fe-lig-dashboard-filter.component';
@Injectable()
export class MonthSelectPopupModalModel{

    public showPopup: boolean = false;
    public submit: EventEmitter<{fiscalYear : string | undefined,month :string | undefined}> =
     new EventEmitter<{fiscalYear : string | undefined ,month :string | undefined}>();
    public close: EventEmitter<boolean> = new EventEmitter<boolean>();
    public feDashboardFilterContainer : ViewContainerRef;
    private KIBANA_DASHBOARD = CONST_VALUES.DYNAMIC_LOADER_ID.KIBANA_DASHBOARD
    constructor(private router: Router, private componentFactoryResolver: ComponentFactoryResolver ){

    }
    public init():void{
      this.loadFELigDashboardFilterComponent()
        
    }  
    public popupOpenHandler():void{

    }
    public popupCloseHandler():void{
        this.close.emit(true)
    }
    public downloadClickHander():void{
        //this.setFilterIntialVal();

        // const submittedValue = {
        //   fiscalYear : this.selectedFinancialYear ? this.selectedFinancialYear + "-" + this.selectedFinancialYear+1 : undefined,
        //   month : this.selectedMonth ? this.selectedFinancialYear + "-" + this.selectedMonth+1 : undefined
        // }
        // this.submit.emit(submittedValue)
    }
    public loadFELigDashboardFilterComponent() : void {

      // After navigation is complete, dynamically load  
      const factory = this.componentFactoryResolver.resolveComponentFactory(FELigDashboardFilterComponent);
      const feComponentRef = factory.create(this.feDashboardFilterContainer.injector);
          
      //
      feComponentRef.instance.dynamicLoader = this.KIBANA_DASHBOARD

      // Attach  component to the DOM
      this.feDashboardFilterContainer.insert(feComponentRef.hostView);
    }


}