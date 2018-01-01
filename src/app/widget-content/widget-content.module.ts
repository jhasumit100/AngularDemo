import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material';
import { WidgetContentLayoutComponent } from './widget-content-layout/widget-content-layout.component';
import { ChartModule } from '../charts';
import { Charts } from '../Data/charts';
import { ChartService } from '../Data/chart.service';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@NgModule({
    imports: [
        CommonModule, MatGridListModule, ChartModule
    ],
    declarations: [WidgetContentLayoutComponent],
    exports: [
        WidgetContentLayoutComponent
    ],
    providers: []
})
export class WidgetContentModule {
    
}