import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ReportsAccessedCountModel} from './../../models/reports-accessed-count.model';
import { ReportsAccessedCountDModel } from './../../services/analytic-logs.service'


@Component({

  selector: 'app-reports-accessed-count',
  templateUrl: './reports-accessed-count.component.html',
  styleUrls: ['./../logs/logs.component.css' , './reports-accessed-count.component.css']
})
export class ReportsAccessedCountComponent implements OnInit, OnDestroy {

  public  get reportsAccessedCountdataSource():Array<ReportsAccessedCountDModel> | undefined  {
    return this.reportsAccessedCountModel.reportsAccessedCountdataSource
  }
  public get fromDate():Date{
    return this.reportsAccessedCountModel.fromDate
  }
  public set fromDate(value:Date){
    this.reportsAccessedCountModel.fromDate=value
  }
  public get toDate():Date{
    return this.reportsAccessedCountModel.toDate
  }
  public set toDate(value:Date){
    this.reportsAccessedCountModel.toDate=value
  }
  public get minDate():Date{
    return this.reportsAccessedCountModel.minDate
  }
  public get maxDate():Date{
    return this.reportsAccessedCountModel.maxDate
  }
  public get isInvalidDuration():boolean{
    return this.reportsAccessedCountModel.isInvalidDuration
  }


  constructor(private  reportsAccessedCountModel: ReportsAccessedCountModel) { }

  ngOnInit(): void {
    this.reportsAccessedCountModel.init()
  }
  ngOnDestroy(): void {
    this.reportsAccessedCountModel.destroy()
  }
  public applyFilterHandler():void{
    this.reportsAccessedCountModel.applyFilterHandler()
  }
  public resetFilterHandler():void{
    this.reportsAccessedCountModel.resetFilterHandler()
  }



}
