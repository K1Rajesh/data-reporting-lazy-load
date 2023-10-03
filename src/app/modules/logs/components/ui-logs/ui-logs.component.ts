import { Component, OnInit } from '@angular/core';
import { UiLogModel } from './../../domain/models/ui-log.model'
import { ActivatedRoute, Router } from '@angular/router';
import { SamlLogService } from './../../services/saml-log.service'

 
@Component({
    selector: 'app-saml-ui-logs',
    templateUrl: './ui-logs.component.html',
    styleUrls: ['./ui-logs.component.css']
})
export class UiLogsComponent implements OnInit {
  
    headers: Array<string>;
    dataSource: Array<UiLogModel>; 
    constructor(private samlLogService: SamlLogService, 
      private activatedRoute: ActivatedRoute){
  
    }
    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params)=>{
        this.subscribeUiLogs(params.sessionId);
      })     
    }
    subscribeUiLogs(sessionId:string){
      this.samlLogService.getUiLogs({sessionId:sessionId}).subscribe(
        (result:Array<UiLogModel>)=>{
        this.dataSource = result;
      })
    }
  
}
