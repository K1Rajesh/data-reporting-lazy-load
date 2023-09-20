import { Injectable } from "@angular/core";
import { AnalyticsLogService, ReportsAccessedCountDModel } from '../services/analytic-logs.service'
import {
    Chart,
    Colors,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Legend
  } from 'chart.js'
import { Subscription, from } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ReportsAccessedCountModel{
    public reportsAccessedCountGraph:any;
    public acquisitionsVal:any;
    public reportsAccessedCountdataSource:Array<ReportsAccessedCountDModel> | undefined = undefined;
    private reportsAccessedCountDefaultdata :Array<ReportsAccessedCountDModel> | undefined = undefined;

    private subsList:Array<Subscription>=new Array<Subscription>();
    public dummyData:Array<any>;
    public fromDate:Date;
    public toDate:Date;
    private chatObj:any;
    public minDate: Date;
    public maxDate: Date;
    public isInvalidDuration: boolean = false;
    public errorMessage : string = "";
    constructor(private  analyticsLogService: AnalyticsLogService) { }
    init(){
        
        this.setDefaultDuration();
        this.registerChartControlls();
        this.setCalendarMinMax();
        this.subscribeReportsAccessedCountDuring(this.fromDate, this.toDate);

    }
    public registerChartControlls(){
      Chart.register(
        Colors,
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Legend
      );
    }   
    private setCalendarMinMax():void{
      const date = new Date();
      this.minDate = new Date(date.getFullYear()-1,date.getMonth(),1);
      this.maxDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    }
    subscribeReportsAccessedCountDuring(fromDate?:Date, toDate?:Date): void {
      
      let trasformedFromDate:Date = fromDate ? new Date(fromDate) : new Date();
      let trasformedToDate:Date = toDate ? new Date(toDate)  :new Date();
      //this.scrutinyDatesDuration(fromDate, toDate);
      if(!fromDate && !toDate){
        //set default date
        const date = new Date();
        trasformedFromDate = new Date(date.getFullYear(),date.getMonth(),1);
        trasformedToDate = new Date(date.getFullYear(),date.getMonth()+1,0,23,59,59);
        //proceed to  api call
      }
      else if(!fromDate || !toDate){
        //show warning notification
        this.setInvalidFilterUi(true)
        //skip api call
        return;
      }
      else if( fromDate > toDate){
        //show error notification
        this.setInvalidFilterUi(true)
        //skip api call
        return;     
      }

      this.subsList.push(
          this.analyticsLogService.getReportsAccessedCount(trasformedFromDate, trasformedToDate)
          .subscribe(
            (reportsAccessedCount:ReportsAccessedCountDModel[])=>{
            console.log("ReportsAccessedCount: ",reportsAccessedCount)
              if(reportsAccessedCount){
                this.reportsAccessedCountdataSource = reportsAccessedCount;
                this.defaultSortDataSource();
                if(!this.reportsAccessedCountDefaultdata){
                  this.setDefaultDataSource(this.reportsAccessedCountdataSource)
                }
                this.chartInit(this.reportsAccessedCountdataSource);
              }
            }
          )
      )

    }

    clearDurationFilter(){
      //clear the duration filter
      this.setDefaultDuration()
      //set datasource to dafault
      this.setDataSourceToDefault();
    }
    setDataSourceToDefault(){
      this.reportsAccessedCountdataSource =  this.reportsAccessedCountDefaultdata;
      this.chartInit(this.reportsAccessedCountdataSource);
    }
    setDefaultDataSource(reportsAccessedCount:ReportsAccessedCountDModel[]):void{
      this.reportsAccessedCountDefaultdata = reportsAccessedCount;
    }
    setDefaultDuration(){
      const date = new Date();
      this.fromDate = new Date(date.getFullYear(),date.getMonth(),1);
      this.toDate = new Date(date.getFullYear(),date.getMonth()+1,0,23,59,59);
    }

    public chartInit(reportsAccessedCount?:ReportsAccessedCountDModel[]):void{  
      if(reportsAccessedCount){
        if(this.chatObj){
          this.chatObj.destroy();
        }
        this.chatObj = new Chart(
          'acquisitions',
          {
            type: 'bar',
            data: {
              labels: reportsAccessedCount.map(row => row._id),
              datasets: [
                {
                  label: 'Report accessed Count',
                  data: reportsAccessedCount.map(row => row.count)
                }
              ]
            }
          }
        );
      }

    }
    public clearValues():void{
      this.reportsAccessedCountdataSource =  undefined;
      this.reportsAccessedCountDefaultdata = undefined;
    }
    public applyFilterHandler():void{
      let fromDate = new Date(this.fromDate);
      fromDate.setHours(0,0,0)
      let toDate = new Date(this.toDate);
      toDate.setHours(23,59,59)

      this.setInvalidFilterUi(false);

      this.subscribeReportsAccessedCountDuring( fromDate, toDate);

    }
    setInvalidFilterUi(val:boolean):void{
      if(val){
        this.isInvalidDuration = true;
        this.errorMessage = "Please select valid date range";
      }
      else{
        this.isInvalidDuration = false;
        this.errorMessage  = "";
      }
    }
    public resetFilterHandler():void{
      this.setInvalidFilterUi(false);
      this.setDefaultDuration()
      this.setDataSourceToDefault();
    }
    public defaultSortDataSource(){
      if(this.reportsAccessedCountdataSource){
        this.reportsAccessedCountdataSource.sort(
          (obj1:ReportsAccessedCountDModel,obj2:ReportsAccessedCountDModel)=>{
            if(obj1?.count >=0  && obj2?.count >=0){
              return obj2.count - obj1.count
            }
            else{
              return 0
            }
          })
      }
    }

    public destroy():void{
      this.clearValues();
      this.subsList.forEach(sub =>sub.unsubscribe());
    }
}





      // public dummyDataInit(){
      //   this.dummyChartInit()
      // }
      // public dummyChartInit():void{     
      //       new Chart('acquisitions', {
      //         type: 'bar', //this denotes tha type of chart
        
      //         data: {// values on X-Axis
      //           labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
      //                    '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
      //            datasets: [
      //             {
      //               label: "Sales",
      //               data: ['467','576', '572', '79', '92',
      //                    '574', '573', '576'],
      //               backgroundColor: 'blue'
      //             },
      //             {
      //               label: "Profit",
      //               data: ['542', '542', '536', '327', '17',
      //                      '0.00', '538', '541'],
      //               backgroundColor: 'limegreen'
      //             }  
      //           ]
      //         },
      //         options: {
      //           aspectRatio:2.5
      //         }
              
      //       });
        
      // }