import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule, FormsModule, MatSelectModule, ReactiveFormsModule
    ],
    declarations: [SettingComponent],
    exports: [
        SettingComponent
    ],
    providers: []
})
export class SettingsModule {
}