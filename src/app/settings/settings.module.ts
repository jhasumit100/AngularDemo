import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [SettingComponent],
    exports: [
        SettingComponent
    ],
    providers: []
  })
  export class SettingsModule {
  }