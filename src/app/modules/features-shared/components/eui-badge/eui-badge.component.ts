import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-eui-badge',
  templateUrl: './eui-badge.component.html',
  styleUrls: ['./eui-badge.component.css']
})
export class EuiBadgeComponent implements OnInit {

  constructor() { }
  @Input() displayName:string;
  ngOnInit(): void {
  }

}
