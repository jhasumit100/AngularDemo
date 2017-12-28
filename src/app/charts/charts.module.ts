import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    PieChartComponent,BarChartComponent,LineChartComponent,DoughnutChartComponent
  ],
  declarations: [PieChartComponent, BarChartComponent, LineChartComponent, DoughnutChartComponent]
})
export class PieChartModule { }
