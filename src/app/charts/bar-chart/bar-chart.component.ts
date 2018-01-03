import { Component, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color, BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  charts: Charts;

  public colors: Array<Color> = [{}];
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartData: any[] = [];
  public barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    events: ['click'],

    scales: {
      xAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
          fontSize: 10,
          callback: function (tick) {
            var characterLimit = 20;
            if (tick.length >= characterLimit) {
              return tick.slice(0, tick.length).substring(0, characterLimit - 1).trim() + '...';
            }
            return tick;
          }
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 100,
          scaleSteps: 10,
          fontSize: 8
        }
      }]
    }

  };
  @ViewChild('barcanvas') canvasChart: Chart;

  @ViewChild(BaseChartDirective) private _chart;

  forceChartRefresh() {
        setTimeout(() => {
            this._chart.refresh();
        }, 10);
    }

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.barChartData = [];
      this.barChartLabels = [];
      charts.Chartdata.dataSets.forEach(element => {
        this.barChartData.push(element);
      });

      charts.Chartdata.labels.forEach(element => {
        this.barChartLabels.push(element);
      });
    }

    if (this.canvasChart) {
      let ctx = this.canvasChart.nativeElement.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      let myChart = new Chart(ctx, {
        type: this.barChartType,
        data: {
          datasets: this.barChartData,
          labels: this.barChartLabels
        },
        options: this.barChartOptions
      });
    }
    this.forceChartRefresh();
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
