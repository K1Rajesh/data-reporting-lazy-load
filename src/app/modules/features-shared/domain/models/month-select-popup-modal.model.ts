import { Injectable, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { CONST_VALUES } from "../../../../core/constant-reources";

import { FELigDashboardFilterComponent } from '../../../fe-dashboards/components/fe-lig-dashboard-filter/fe-lig-dashboard-filter.component';
import { LigFormFilterControlService } from '../../../fe-dashboards/services/lig-form-filter-controls.service';
import { LigDataFilterIModel } from "../../../fe-dashboards/models/api/lig-data-request.model";


@Injectable()
export class MonthSelectPopupModalModel{

    public showPopup: boolean = false;
    public submit: EventEmitter<LigDataFilterIModel> = new EventEmitter<LigDataFilterIModel>();
    public close: EventEmitter<boolean> = new EventEmitter<boolean>();
    public feDashboardFilterContainer : ViewContainerRef;
    private KIBANA_DASHBOARD = CONST_VALUES.DYNAMIC_LOADER_ID.KIBANA_DASHBOARD
    private dynamicFELigDashboardFilterComponent : FELigDashboardFilterComponent;
    private subsList:Array<Subscription> = new Array<Subscription>();
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private ligFormFilterControlService : LigFormFilterControlService ){

    }
    public init():void{
     
        
    }  
    public popupOpenHandler():void{

    }
    public popupCloseHandler():void{
        this.close.emit(true)
    }
    public downloadClickHander():void{
      this.subscribeSelectedFilters();
    }
    public loadFELigDashboardFilterComponent() : void {

      // After navigation is complete, dynamically load  
      const factory = this.componentFactoryResolver.resolveComponentFactory(FELigDashboardFilterComponent);
      const feComponentRef = factory.create(this.feDashboardFilterContainer.injector);
          
      //
      this.dynamicFELigDashboardFilterComponent = feComponentRef.instance as FELigDashboardFilterComponent
      this.dynamicFELigDashboardFilterComponent.dynamicLoader = this.KIBANA_DASHBOARD

      // Attach  component to the DOM
      this.feDashboardFilterContainer.insert(feComponentRef.hostView);
    }
    public unLoadFELigDashboardFilterComponent():void{
      this.feDashboardFilterContainer?.clear();
    }
    public subscribeSelectedFilters(){
      this.subsList.push(
        this.ligFormFilterControlService.selctedFilters$
        .pipe(take(1))
        .subscribe((selectedFilters: LigDataFilterIModel | undefined)=>{
          if(selectedFilters){
            this.submit.emit(selectedFilters!)
              //this.close.emit(true);
          }
        })
      );
    }
    public destroy():void{
      this.subsList.forEach((sub)=>{
        sub.unsubscribe();
      })
    }

}