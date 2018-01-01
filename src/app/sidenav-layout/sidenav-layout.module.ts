import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavLayoutComponent } from './sidenav-layout/sidenav-layout.component';
import { MatSidenavModule } from '@angular/material';
import { SidenavToggleDirective } from './sidenav-toggle.directive';
import { SidenavToggleService } from './sidenav-toggle.service';
import { SettingsModule } from '../settings';
import { WidgetContentModule } from '../widget-content';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    SettingsModule,
    WidgetContentModule,
    NgProgressModule
  ],
  declarations: [SidenavLayoutComponent, SidenavToggleDirective],
  exports: [
    SidenavLayoutComponent,
    SidenavToggleDirective
  ],
  providers: [SidenavToggleService]
})
export class SidenavLayoutModule {
}