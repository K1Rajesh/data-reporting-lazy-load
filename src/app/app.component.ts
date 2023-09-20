import { Component } from '@angular/core';
import { AppModel } from './model/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-reporting';
  constructor(private appModel:AppModel){
    
  }
  ngOnInit(){
    console.log("At AppComponent ngOnInit");
    this.appModel.init();
  }
  get isAuthenticated(){
    return this.appModel.isAuthenticated;
  }
  ngOnDestroy(){
    this.appModel.destroy();
  }
}
