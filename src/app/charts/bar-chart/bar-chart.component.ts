import { Component, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Color } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  charts : Charts;
  
  @ViewChild('barcanvas') canvasChart: Chart;

  @Input('charts')
  set in (charts){
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
      ctx.clearRect(0,0,0,0);
      let myChart = new Chart(ctx, {
        type: this.barChartType,
        data: {
          datasets: this.barChartData,
          labels: this.barChartLabels
        },
        options: this.barChartOptions
      });
    }
  }
  public colors: Array<Color> = [{}];
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [];
  public barChartOptions:any = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    events: ['click']
  };
  constructor() { }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
