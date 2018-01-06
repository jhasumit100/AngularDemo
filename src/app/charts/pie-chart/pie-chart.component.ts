import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Charts } from '../../Data/charts';
import { Chart } from 'chart.js';
import { Color, BaseChartDirective } from 'ng2-charts';
import { MatSpinner } from '@angular/material';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  charts: Charts;
  dataHistory: any[] = [];
  private DrillCounter: number = 0;
  private gTotalLevelsCount: number = 0;
  DrillDataLevel: string[] = [
    'Product Sub Cateory', 'Season', 'Life Cycle Stage', 'Country of Origin'
  ];
  //public colors: Array<Color> = [{}];
  private pieChartDataSet: Array<any>[] = [];
  private pieChartLabels: string[] = [];
  private pieChartColors: any[] = [];
  private pieChartData: number[] = [];
  private pieChartType: string = 'pie';
  private pieChartTitle: string = '';
  private gObjDrillDownHistory: string[] = [];

  @ViewChild(BaseChartDirective) private _chart;

  @ViewChild('chartdata') _chartdata : ElementRef;

  forceChartRefresh() {
    setTimeout(() => {
      if (this._chart) {
        this._chart.refresh();
      }
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
    //events: ['click'],
    color: function (context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      return value;
    }
  };

  setDefault() {
    this.pieChartDataSet = [];
    this.pieChartLabels = [];
    this.pieChartColors = [];
    this.gTotalLevelsCount = this.DrillDataLevel.length;
  }

  setChartData(charts: Charts) {
    charts.Chartdata.dataSets.forEach(element => {
      this.pieChartDataSet.push(element);
    });

    charts.Chartdata.labels.forEach(element => {
      this.pieChartLabels.push(element);
    });

    charts.Chartdata.backgroundColor.forEach(element => {
      this.pieChartColors.push(element);
    });
  }

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.setDefault();
      this.setChartData(this.charts);
      this.pieChartTitle = 'Count By Product Sub Category';
      this.DrillCounter = 0;
      this.gObjDrillDownHistory = [];
    }
    this.forceChartRefresh();
  }

  constructor() {
  }

  // events
  public chartClicked(e: any): void {
    var activePoints = e.active;
    if (activePoints.length > 0) {
      var chartData = activePoints[0]['_chart'].config.data;
      var idx = activePoints[0]['_index'];
      var label = chartData.labels[idx];
      var value = chartData.datasets[0].data[idx];
      this.DrillDown(this.DrillDataLevel[this.DrillCounter], label, value);
    }
  }

  DrillDown(CurrentView, TargetedView, value) {
    let toolTipSet, dataCount, widgetdata, canvasTitle;
    this._chartdata.nativeElement.innerHTML="";
    if (this.DrillCounter == 0) {
      this.dataHistory[this.DrillCounter] = this.charts;
      widgetdata = this.dataHistory[this.DrillCounter].filteredValue;
      widgetdata = widgetdata.filter(a => a.productsubcategory == TargetedView);
      this.DrillCounter++;
    } else {
      widgetdata = this.dataHistory[this.DrillCounter].filteredValue;
      this.DrillCounter++;
    }
    if (this.DrillCounter >= this.gTotalLevelsCount) {
      this._chartdata.nativeElement.innerHTML = "Max Level reached";
      this.DrillCounter--;
      return;
    }
    this.gObjDrillDownHistory[this.DrillCounter] = CurrentView + '~' + TargetedView + '~' + value;

    let data = new Charts();
    data.context = this.charts.context;
    data.nextLink = this.charts.nextLink;
    data.value = this.charts.value;
    data.Chartdata = new Object();
    if (this.DrillDataLevel[this.DrillCounter - 1] == "Season")
      widgetdata = widgetdata.filter(a => a.season == TargetedView);
    else if (this.DrillDataLevel[this.DrillCounter - 1] == "Life Cycle Stage")
      widgetdata = widgetdata.filter(a => a.plc == TargetedView);
    else if (this.DrillDataLevel[this.DrillCounter - 1] == "Country of Origin")
      widgetdata = widgetdata.filter(a => a.plc == TargetedView);
    else { }
    data.filteredValue = widgetdata;
    dataCount = new Array<number>();
    if (widgetdata.length > 0) {
      canvasTitle = 'Count by ';
      for (var i = 0; i < this.DrillCounter; i++) {
        if (i > 0 && i <= this.DrillCounter - 1)
          canvasTitle += ', ';
        canvasTitle += this.DrillDataLevel[i] + ' (';
        canvasTitle += this.gObjDrillDownHistory[i + 1].split('~')[1] + ')'
      }
      if (canvasTitle != 'Count by ')
        canvasTitle += ' and ' + this.DrillDataLevel[this.DrillCounter];
      else
        canvasTitle += this.DrillDataLevel[this.DrillCounter];
      this.pieChartTitle = canvasTitle;

      if (!this.dataHistory[this.DrillCounter]) {
        if (this.DrillDataLevel[this.DrillCounter] == "Season") {
          toolTipSet = new Set(widgetdata.map(a => a.season));
          toolTipSet.forEach(item => {
            dataCount.push(widgetdata.map(a => a.season).filter(x => x == item.toString()).length);
          });
        }
        if (this.DrillDataLevel[this.DrillCounter] == "Life Cycle Stage") {
          toolTipSet = new Set(widgetdata.map(a => a.plc));
          toolTipSet.forEach(item => {
            dataCount.push(widgetdata.map(a => a.plc).filter(x => x == item.toString()).length);
          });
        }
        if (this.DrillDataLevel[this.DrillCounter] == "Country of Origin") {
          toolTipSet = new Set(widgetdata.map(a => a.countryoforigin));
          toolTipSet.forEach(item => {
            dataCount.push(widgetdata.map(a => a.countryoforigin).filter(x => x == item.toString()).length);
          });
        }

        let toolTip = new Array<string>();
        toolTipSet.forEach(item => {
          toolTip.push(item);
        });

        let backgroundColorSet = new Set();
        while (backgroundColorSet.size < toolTipSet.size) {
          backgroundColorSet.add(data.getRandomColor())
        }
        let backgroundColor = new Array<any>();
        backgroundColorSet.forEach(item => {
          backgroundColor.push(item);
        });
        data.Chartdata.dataSets = [
          {
            "data": dataCount,
            "backgroundColor": backgroundColor,
            "hoverBackgroundColor": backgroundColor
          }
        ];
        data.Chartdata.labels = toolTip;
        data.Chartdata.backgroundColor = backgroundColor;

        if (data) {
          this.dataHistory[this.DrillCounter] = data;
          this.setDefault();
          this.setChartData(data);
          this.forceChartRefresh();
          this._chartdata.nativeElement.innerHTML = "";
        }
      }
      else {
        this.setDefault();
        this.setChartData(this.dataHistory[this.DrillCounter]);
        this.forceChartRefresh();
      }
    }
    else {
      this._chartdata.nativeElement.innerHTML = "No Data Found for this Selection...";
      this.DrillCounter--;
    }
    return;
  }

  Back() {
    if (this.DrillCounter == 1) {
      this.setDefault();
      this.DrillCounter = 0;
      this.pieChartTitle = 'Count by ' + this.DrillDataLevel[0];
      this.setChartData(this.charts);
      this.forceChartRefresh();
    }
    else if (this.DrillCounter > 1) {
      let arrHistory = this.gObjDrillDownHistory[this.DrillCounter - 1].split('~');
      this.DrillCounter = this.DrillCounter - 2;
      this.DrillDown(arrHistory[0], arrHistory[1], arrHistory[2]);
    }
    else {
      this._chartdata.nativeElement.innerHTML = "No More Levels before this...";
    }
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
