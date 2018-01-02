import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  charts: Charts;

  public colors: Array<Color> = [{}];
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
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
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  @ViewChild('linecanvas') canvasChart: Chart;

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.lineChartData = [];
      charts.Chartdata.dataSets.forEach(element => {
        this.lineChartData.push(element);
      });
      this.lineChartLabels = [];
      charts.Chartdata.labels.forEach(element => {
        this.lineChartLabels.push(element);
      });
    }
    if (this.canvasChart) {
      let ctx = this.canvasChart.nativeElement.getContext("2d");
      let myChart = new Chart(ctx, {
        type: this.lineChartType,
        data: {
          datasets: this.lineChartData,
          labels: this.lineChartLabels
        },
        options: this.lineChartOptions
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
