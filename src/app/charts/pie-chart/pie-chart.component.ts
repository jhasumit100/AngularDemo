import { Component, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Chart } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  charts: Charts;

  @ViewChild('piecanvas') canvasChart: Chart;

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.pieChartDataSet = [];
      this.pieChartLabels = [];
      charts.Chartdata.dataSets.forEach(element => {
        this.pieChartDataSet.push(element);
      });

      charts.Chartdata.labels.forEach(element => {
        this.pieChartLabels.push(element);
      });
    }

    if (this.canvasChart) {
      let ctx = this.canvasChart.nativeElement.getContext("2d");
      let myChart = new Chart(ctx, {
        type: this.pieChartType,
        data: {
          datasets: this.pieChartDataSet,
          labels: this.pieChartLabels
        },
        options: this.pieChartOptions
      });
      //myChart.update();
    }
  }

  public pieChartOptions: any = {
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
    }
  };
  //public colors: Array<Color> = [{}];
  public pieChartDataSet: Array<any>[] = [];
  public pieChartLabels: string[] = [];
  public pieChartColors: any[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  constructor() {

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
