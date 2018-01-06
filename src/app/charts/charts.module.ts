import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { oDataService } from '../Data/data.services';
import { HttpModule } from '@angular/http';
import { ChartService } from '../Data/chart.service';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    MatIconModule
  ],
  exports: [
    PieChartComponent, BarChartComponent, LineChartComponent, DoughnutChartComponent, HttpModule
  ],
  providers: [
    oDataService, ChartService
  ],
  declarations: [PieChartComponent, BarChartComponent, LineChartComponent, DoughnutChartComponent]
})
export class ChartModule {

}
