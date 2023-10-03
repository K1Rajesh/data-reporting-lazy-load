import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SafePipe } from './pipes/app.filter.pipe';
import { MonthNamePipe } from './pipes/month-name.pipe'

import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SideNavComponent} from './components/side-nav/side-nav.component';
import { SubFeturesComponent} from './components/sub-fetures/sub-fetures.component';
import { MonthSelectPopupModalComponent } from './components/month-select-popup-modal/month-select-popup-modal.component';
import { LoaderUiComponent } from './components/loader-ui/loader-ui.components'


@NgModule({
  declarations: [
    TopNavComponent,
    SideNavComponent,
    SubFeturesComponent,
    MonthSelectPopupModalComponent,
    LoaderUiComponent,
    SafePipe,
    MonthNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    TopNavComponent,
    SideNavComponent,
    SubFeturesComponent,
    MonthSelectPopupModalComponent,
    LoaderUiComponent,
    SafePipe
  ]
})
export class FeaturesSharedModule { }
