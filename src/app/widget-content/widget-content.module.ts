import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatCardModule } from '@angular/material';
import { WidgetContentLayoutComponent } from './widget-content-layout/widget-content-layout.component';
import { ChartModule } from '../charts';
import { Charts } from '../Data/charts';
import { ChartService } from '../Data/chart.service';
import { Observable } from 'rxjs/Observable';
import { GridModule } from '../grid';

@NgModule({
    imports: [
        CommonModule, MatGridListModule, ChartModule, MatCardModule, GridModule
    ],
    declarations: [WidgetContentLayoutComponent],
    exports: [
        WidgetContentLayoutComponent
    ],
    providers: []
})
export class WidgetContentModule {
    
}