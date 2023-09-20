import { Component, OnInit } from '@angular/core';
 import {  ActivatedRoute, NavigationEnd, Router } from '@angular/router';
 import { filter} from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  public showChild:boolean = false;
  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }
  public logsIconPath = "./assets/logs-logo.png";
  ngOnInit(): void {
    this.subscribeToActivatedUrls()
  }
  public subscribeToActivatedUrls(){

        this.showChild = this.activatedRoute.children.length > 0 ? true : false
        //this.router.url === "/logs" ? false : true;
        console.log("At subscribeToActivatedUrls:")
        this.router.events
        .pipe(
          filter((event)=> event instanceof NavigationEnd),
        )
        .subscribe((currentUrl)=>{
          console.log("LogsComponent currentUrl: ",currentUrl)
          if(currentUrl  ){ 
            this.showChild = this.activatedRoute.children.length > 0 ? true : false  
            //this.showChild = this.router.url === "/logs" ? false : true;
          }
        })
    }
    ngOnDestroy(){

    }

}
