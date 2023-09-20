import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable,of } from 'rxjs';
import { ConfigModel } from './../domain/model/config.model';
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
        return of(          {
          "ufillHirearchyMaps": {
            "Repeat Customers - State": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/1e2415f0-c31e-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "Repeat Customers - Territory": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/ddb1e860-c31f-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "Ticket Size - Overall": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/ceddcc20-c322-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "Ticket Size - State": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/86eeab90-c328-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "Ticket Size - Territory": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/9bf55f80-c32c-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "Top 100 Customers -Territory wise": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/78d56260-c7e2-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "QR Scan vs Manual Entry - RO wise": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/bbd1a950-c7f8-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "Repeat vs New Customers": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/03dfc530-cc75-11ed-9daa-bdee6d9e23f4?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "RO wise bucketing": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/94e1f470-cc8b-11ed-9daa-bdee6d9e23f4?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "UFILL Performance - Monthwise": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/51380250-f48b-11ed-aef9-c57dd217777d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "UFILL Performance - Summary": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/f0ed4e50-f9ee-11ed-aef9-c57dd217777d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
            "UFILL Performance - Datewise": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/7170c510-10f2-11ee-bcb2-9f8c747241b5?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-5y%2Cto%3Anow))",
            "ACoE - UFill Dashboards": "https://analytics.bpcl.co.in/adfs/sense/app/f19d5241-b6a3-4387-bedd-036a7d7e6d39/sheet/c315ab1f-7d67-4c17-9dc9-5bbc60e3e500/state/analysis"
          },
          "ligHirearchyMaps":{
            "LIG Monthly Control Report" : "https://reports.bpcl.co.in/kibana/app/dashboards#/view/071fad20-2218-11ee-adf4-fb0210763cf7?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))"
          },
          "indexingReport": "https://reports.bpcl.co.in/kibana/app/dashboards#/view/71810be0-fee2-11ed-9b6d-2baf9fac0e11?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1w%2Cto%3Anow))&show-time-filter=true"
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