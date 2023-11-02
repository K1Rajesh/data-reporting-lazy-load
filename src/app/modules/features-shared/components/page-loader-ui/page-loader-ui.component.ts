import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-page-loader-ui',
  templateUrl: './page-loader-ui.component.html',
  styleUrls: ['./page-loader-ui.component.css']
})
export class PageLoaderUiComponent  {

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const parent = this.el.nativeElement.parentElement;
    const c1 = this.el.nativeElement;
    c1.style.top = `${parent.scrollTop}px`;
    c1.style.left = `${parent.scrollLeft}px`;
  }

}
