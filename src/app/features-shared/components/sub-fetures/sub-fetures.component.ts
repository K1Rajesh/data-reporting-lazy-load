import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubFeatureCardDModel } from './../../domain/model/sub-feature-card-model';
import { SubFeatureCardModel } from './../../model/sub-feature-card.model'


@Component({
  selector: 'app-sub-fetures',
  templateUrl: './sub-fetures.component.html',
  styleUrls: ['./sub-fetures.component.css'],
  providers:[SubFeatureCardModel]
})

export class SubFeturesComponent implements OnInit, OnDestroy {

  subFeatureCardsList : Array<string>;
  @Input('feature') 
  set feature( value : string){
    this.subFeatureCardModel.featureName = value
  }
  get subFeatureCards(): Array<SubFeatureCardDModel>{
    return this.subFeatureCardModel.subFeatureCards;
  }
  constructor(private subFeatureCardModel : SubFeatureCardModel) {

   }
   selectSubFeature(cardName:string){
      this.subFeatureCardModel.selectSubFeature(cardName.toLowerCase());
   }

  ngOnInit(): void {
    this.subFeatureCardModel.init()
  }
  ngOnDestroy(): void {
    this.subFeatureCardModel.destroy()
  }


}


