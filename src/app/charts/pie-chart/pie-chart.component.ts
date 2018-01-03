import { Component, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Chart } from 'chart.js';
import { Color, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  charts: Charts;

  //public colors: Array<Color> = [{}];
  public pieChartDataSet: Array<any>[] = [];
  public pieChartLabels: string[] = [];
  public pieChartColors: any[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  @ViewChild('piecanvas') canvasChart: Chart;

  @ViewChild(BaseChartDirective) private _chart;

  forceChartRefresh() {
        setTimeout(() => {
            this._chart.refresh();
        }, 10);
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
    },
    events: ['click'],
    color: function (context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      return value;
    }
  };

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.pieChartDataSet = [];
      this.pieChartLabels = [];
      this.pieChartColors = [];
      charts.Chartdata.dataSets.forEach(element => {
        this.pieChartDataSet.push(element);
      });

      charts.Chartdata.labels.forEach(element => {
        this.pieChartLabels.push(element);
      });

      charts.Chartdata.backgroundColor.forEach(element => {
        console.log(element);
        this.pieChartColors.push(element);
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

      this.forceChartRefresh();
    }
  }

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
