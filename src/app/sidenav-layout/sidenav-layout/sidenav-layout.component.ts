import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SidenavToggleService } from '../sidenav-toggle.service';
import { MatSidenav } from '@angular/material';
import { ChartService } from '../../Data/chart.service';
import { Charts } from '../../Data/charts';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-sidenav-layout',
    templateUrl: './sidenav-layout.component.html',
    styleUrls: ['./sidenav-layout.component.css']
})
export class SidenavLayoutComponent implements OnInit {
    data;
    charts: Charts;
    @ViewChild(MatSidenav) private sidenav: MatSidenav;

    constructor(private toggleService: SidenavToggleService,
        private _chartService: ChartService, private progress: NgProgress) {

    }
    async ngOnInit() {
        this.toggleService.subscribe(() => this.sidenav.toggle());
        this.progress.start();
        //this.data = await this._chartService.getChartDataAsync();

        this._chartService.getChartData().subscribe(charts => {
            this.charts = new Charts();
            this.charts.context = charts["@odata.context"];
            this.charts.value = charts["value"];
            this.charts.nextLink = charts["@odata.nextLink"];
            this.charts.Chartdata = new Object();
            let toolTipSet = new Set(this.charts.value.map(a => a.productsubcategory));
            let toolTip = new Array<string>();
            toolTipSet.forEach(item => {
                toolTip.push(item);
            });
            let dataCount = new Array<number>();
            toolTipSet.forEach(item => {
                dataCount.push(this.charts.value.map(a => a.productsubcategory).filter(x => x == item.toString()).length);
            });
            let backgroundColorSet = new Set();
            while (backgroundColorSet.size < toolTipSet.size) {
                backgroundColorSet.add(this.charts.getRandomColor())
            }
            let backgroundColor = new Array<any>();
            backgroundColorSet.forEach(item => {
                backgroundColor.push(item);
            });
            this.charts.Chartdata.dataSets = [
                {
                    "data": dataCount,
                    "backgroundColor": backgroundColor,
                    "hoverBackgroundColor": backgroundColor
                }
            ];

            this.charts.Chartdata.labels = toolTip;
            this.progress.done();
        });
        //this.fetchChartData();
    }

    UpdateChart(event : Charts){
        this._chartService.charts = event;
        this.fetchChartData().subscribe(chart => {
            this.charts = chart;
        });
    }

    fetchChartData() {
        return this._chartService.fetchChartData();
    }

}