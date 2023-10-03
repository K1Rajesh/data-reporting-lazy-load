import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UfillModel } from '../../models/ufill.model';

@Component({
  selector: 'app-ufill',
  templateUrl: './ufill.component.html',
  styleUrls: ['./ufill.component.css']
})
export class UfillComponent implements OnInit {

  uFillIconPath = "./assets/ufill_0310.png";
  constructor(private ufillModel:UfillModel){
    console.log("At UfillComponent constructor");
  }

  ngOnInit(): void {
    console.log("At UfillComponent ngOnInit");
    this.ufillModel.init();
  }
  get dashboardLink(): string{
    return this.ufillModel.dashboardLink;
  }
  get hirearchyDashboards(){
    return this.ufillModel.hirearchyDashboards;
  }
  get dasboardLinkEmpty():boolean {
      return this.dashboardLink == "" ? true: false
  }
}
