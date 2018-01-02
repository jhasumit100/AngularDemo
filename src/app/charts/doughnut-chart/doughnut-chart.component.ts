import { Component, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {
  charts: Charts;

  // Doughnut

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    events: ['click'],
  };
  public colors: Array<Color> = [{}];
  public doughnutChartDataSet: Array<any>[] = [];
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  @ViewChild('doughnutcanvas') canvasChart: Chart;

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.doughnutChartDataSet = [];
      this.doughnutChartLabels = [];

      charts.Chartdata.dataSets.forEach(element => {
        this.doughnutChartDataSet.push(element);
      });

      charts.Chartdata.labels.forEach(element => {
        this.doughnutChartLabels.push(element);
      });
    }

    if (this.canvasChart) {
      let ctx = this.canvasChart.nativeElement.getContext("2d");
      let myChart = new Chart(ctx, {
        type: this.doughnutChartType,
        data: {
          datasets: this.doughnutChartDataSet,
          labels: this.doughnutChartLabels
        },
        options: this.doughnutChartOptions
      });
    }
  }

  constructor() { }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
