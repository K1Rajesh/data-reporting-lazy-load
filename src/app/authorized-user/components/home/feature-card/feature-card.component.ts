import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureCardModel } from './../../../domain/model/feature-card-model';
import { SamlLogService } from './../../../../logs/services/saml-log.service'
@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {

  @Input() featureCard: FeatureCardModel
  constructor(private router:Router, private uiLogService : SamlLogService) { }

  ngOnInit(): void {

  }
  selectFeature():void{
    this.uiLogService.addUiLog(this.featureCard.cardName,"")
    this.router.navigate(["/" + this.featureCard.cardName.toLowerCase()])
  }
}
