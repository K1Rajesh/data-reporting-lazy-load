import { Component, OnDestroy, OnInit  } from '@angular/core';

import  { LigDashboardDataModel } from '../../models/lig-dashboard-data.model'

import { FELigDashboardModel } from '../../domain/models/fe-lig-dashboard.model'


@Component({
  selector: 'app-lig-dashboard',
  templateUrl: './fe-lig-dashboard.component.html',
  styleUrls: ['./fe-lig-dashboard.component.css']
})
export class FELigDashboardComponent implements OnInit , OnDestroy {

  constructor(private ligDashboardModel : FELigDashboardModel) {
  }
  get headerColumns(): Array<string> {
    return  this.ligDashboardModel.headerColumns;
  }
  get paginationMinIndex():number{
    return  this.ligDashboardModel.paginationMinIndex;
  }
  get paginationMaxIndex():number{
    return  this.ligDashboardModel.paginationMaxIndex;
  }
  get currentPageNumber():number{
    return  this.ligDashboardModel.currentPageNumber;
  }
  get snippetPageNumberList():Array<number | string>{
    return  this.ligDashboardModel.snippetPageNumberList;
  }
  
  get currentPageDataSource() : Array<LigDashboardDataModel> | undefined {
    return this.ligDashboardModel.currentPageDataSource
  }
  get filters():any{
    return this.ligDashboardModel.filters;
  }
  ngOnInit(): void {
    this.ligDashboardModel.init();
  }

  public pageSelectHandler(pageSelectedNumberVal:string | number):void{
    this.ligDashboardModel.pageSelectHandler(pageSelectedNumberVal)
  }
  public sort(field:string, sortOrder:string){
    this.ligDashboardModel.dataManipulationSort(field, sortOrder)
  }
 
  public ngOnDestroy(): void {
    this.ligDashboardModel.destroy();
  }

}
