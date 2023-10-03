import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable,of } from 'rxjs';
import { ConfigModel } from '../domain/models/config.model';
import { take } from 'rxjs/operators'

@Injectable({
    providedIn : 'root'
})
export class ConfigService{
    private ufillLink = "../assets/config-data-sources/ufill-iframe-data-links.json"
    private ligLink = "../assets/config-data-sources/lig-iframe-data-link.json.json"
    public config : ConfigModel;
    constructor(private httpClinet: HttpClient){

    }
    init(){
      this.subscribeSourceConfig()
    }
    public getSourceConfig():Observable<ConfigModel>{
        return of({
            "ufillHirearchyMaps": {
              "Repeat Customers - State": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/44226cd0-6571-11ed-8e7c-cb76ba07d6cb?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!t,title:'UFill%20Repeat%20Customer%20Data',viewMode:view)",
              "Repeat Customers - Territory": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/f95d2490-9baa-11ed-a1e6-cb478def64da?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!t,title:'UFill%20Repeat%20Customer%20Data%20Territory',viewMode:view)",
              "Ticket Size - Overall": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/db496af0-6fbc-11ed-8961-a337275ba891?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!f,title:'UFill%20Ticket%20Size%20Overall',viewMode:view)",
              "Ticket Size - State": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/411252c0-a2df-11ed-a1e6-cb478def64da?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!f,title:'UFill%20Ticket%20Size%20Data%20State',viewMode:view)",
              "Ticket Size - Territory": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/4c111cb0-a2df-11ed-a1e6-cb478def64da?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!f,title:'UFill%20Ticket%20Size%20Data%20Territory',viewMode:view)",
              "Top 100 Customers -Territory wise": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/78d56260-c7e2-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1y%2Cto%3Anow))",
              "QR Scan vs Manual Entry - RO wise": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/bbd1a950-c7f8-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-10y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!f,title:'QR%20Scan%20vs%20Manual%20Entry-RO%20wise',viewMode:view)",
              "Repeat vs New Customers": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/03dfc530-cc75-11ed-9daa-bdee6d9e23f4?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
              "RO wise bucketing": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/18021c30-cdf0-11ed-867b-39b422af87e1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
              "UFILL Performance - Monthwise": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/51380250-f48b-11ed-aef9-c57dd217777d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
              "UFILL Performance - Summary": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/f0ed4e50-f9ee-11ed-aef9-c57dd217777d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
              "UFILL Performance - Datewise": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/7170c510-10f2-11ee-bcb2-9f8c747241b5?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
              "ACoE - UFill Dashboards": "https://analytics.bpcl.co.in/adfs/sense/app/f19d5241-b6a3-4387-bedd-036a7d7e6d39/sheet/c315ab1f-7d67-4c17-9dc9-5bbc60e3e500/state/analysis"
            },
            "ligHirearchyMaps":{
              "LIG Monthly Control Report" : "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/071fad20-2218-11ee-adf4-fb0210763cf7?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-10y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:LIG_Report_1,viewMode:view)"
            },
            "indexingReport": "https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/71810be0-fee2-11ed-9b6d-2baf9fac0e11?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1y%2Cto%3Anow))&show-time-filter=true"
          })
        //return this.httpClinet.get<ConfigModel>(this.ufillLink);
    }
    subscribeSourceConfig(){
      this.getSourceConfig()
      .pipe(
        take(1)
      )
      .subscribe((config: ConfigModel)=>{
        if(config){
          this.config = config
        }
      })
    }
    destroy(){

    }
}