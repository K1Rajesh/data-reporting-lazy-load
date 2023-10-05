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
import { LoaderUiComponent } from './components/loader-ui/loader-ui.components';
import { PageLoaderUiComponent } from './components/page-loader-ui/page-loader-ui.component';
import { EuiBadgeComponent } from './components/eui-badge/eui-badge.component'


@NgModule({
  declarations: [
    TopNavComponent,
    SideNavComponent,
    SubFeturesComponent,
    MonthSelectPopupModalComponent,
    LoaderUiComponent,
    SafePipe,
    MonthNamePipe,
    PageLoaderUiComponent,
    EuiBadgeComponent
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
    PageLoaderUiComponent,
    EuiBadgeComponent,
    SafePipe
  ]
})
export class FeaturesSharedModule { }
