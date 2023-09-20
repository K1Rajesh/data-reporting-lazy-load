import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeatureCardModel } from './../../domain/model/feature-card-model';
import { DivisionsModel } from './../../model/divisions.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private divisionsModel: DivisionsModel) {
   }

  ngOnInit(): void {
  
    console.log("At HomeComponent ngOnInit");
    this.divisionsModel.init();

  }
  get featureCards(): Array<FeatureCardModel>{
    return this.divisionsModel.featureCards;
  }


}

