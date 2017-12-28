import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material';
import { WidgetContentLayoutComponent } from './widget-content-layout/widget-content-layout.component';
import { PieChartModule } from '../charts';

@NgModule({
    imports: [
        CommonModule,MatGridListModule,PieChartModule
    ],
    declarations: [WidgetContentLayoutComponent],
    exports: [
        WidgetContentLayoutComponent
    ],
    providers: []
  })
  export class WidgetContentModule {
  }