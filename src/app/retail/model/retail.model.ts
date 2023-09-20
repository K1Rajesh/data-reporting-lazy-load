import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { filter} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RetailModel{
    showChild:boolean;
    constructor(
        private router: Router
      ){}
  public init(): void{
    //subscribeActivatedRoute show parent component or childComponents
    this.subscribeActivatedRoute()
    
  }
  subscribeActivatedRoute(){

    this.showChild = this.router.url === "/retail" ? false : true;
    console.log("At subscribeToActivatedUrls:")
    this.router.events
    .pipe(
      filter((event)=> event instanceof NavigationEnd),
    )
    .subscribe((currentUrl)=>{
      console.log("currentUrl",currentUrl)
      if(currentUrl  ){   
        this.showChild = this.router.url === "/retail" ? false : true;
      }
    })

  }

}