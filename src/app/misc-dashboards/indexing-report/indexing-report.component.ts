import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../features-shared/services/config.service';
import { ConfigModel } from './../../features-shared/domain/model/config.model';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-indexing-report',
  templateUrl: './indexing-report.component.html',
  styleUrls: ['./indexing-report.component.css']
})
export class IndexingReportComponent implements OnInit {
  dashboardLink: string;
  constructor(private configService: ConfigService) { }
  
  ngOnInit(): void {
    this.dashboardLink = "";
    this.configService.getSourceConfig()
    .pipe(
      take(1)
    )
    .subscribe((ufillConfig: ConfigModel)=>{
      this.dashboardLink = ufillConfig.indexingReport;
    })

    this.dashboardLink  =   this.configService.config.indexingReport
 
  }
}
