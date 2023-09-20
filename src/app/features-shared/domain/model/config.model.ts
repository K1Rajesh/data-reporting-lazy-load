export interface ConfigModel{
    ufillHirearchyMaps : UfillHirearchyMaps
    ligHirearchyMaps : LigHirearchyMaps,
    indexingReport:string
}

interface UfillHirearchyMaps {
    "Repeat Customers - State": string, //"https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/44226cd0-6571-11ed-8e7c-cb76ba07d6cb?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!t,title:'UFill%20Repeat%20Customer%20Data',viewMode:view)",
    "Repeat Customers - Territory": string, //"https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/f95d2490-9baa-11ed-a1e6-cb478def64da?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!t,title:'UFill%20Repeat%20Customer%20Data%20Territory',viewMode:view)",
    "Ticket Size - Overall": string, //"https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/db496af0-6fbc-11ed-8961-a337275ba891?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!f,title:'UFill%20Ticket%20Size%20Overall',viewMode:view)",
    "Ticket Size - State": string, //"https://reportsdev.bpcl.co.in/kibana/app/dashboards?security_tenant=global#/view/411252c0-a2df-11ed-a1e6-cb478def64da?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1y,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!f,title:'UFill%20Ticket%20Size%20Data%20State',viewMode:view)",
    "Ticket Size - Territory": string,
    "Top 100 Customers -Territory wise": string, //"https://reports.bpcl.co.in/kibana/app/dashboards#/view/78d56260-c7e2-11ed-889b-ab4d283f8ed1?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-10y%2Cto%3Anow))",
    "QR Scan vs Manual Entry - RO wise": string,
    "Repeat vs New Customers": string,
    "RO wise bucketing": string,
    "UFILL Performance - Monthwise": string,
    "UFILL Performance - Summary": string,
    "UFILL Performance - Datewise": string,
    "ACoE - UFill Dashboards": string
}
interface LigHirearchyMaps{
    "LIG Monthly Control Report" : string
}