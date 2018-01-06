import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Charts } from '../../Data/charts';
import { FormControl, FormGroup, FormArray } from '@angular/forms/src/model';
import { Observable } from 'rxjs';
import { ChartService } from '../../Data/chart.service';

@Component({
  selector: 'widget-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  updateCharts: Charts;
  charts: Charts;

  ProductGroups: string;
  ProductGroupList: string[] = [];
  Themes: string;
  ThemeList: string[] = [];
  Seasons: string;
  SeasonList: string[] = [];
  Genders: string;
  GenderList: string[] = [];
  Plcs: string;
  PlcList: string[] = [];
  CountryofOrigins: string;
  CountryofOriginList: string[] = [];

  @Output()
  filter = new EventEmitter<any>();
  obscharts: Observable<Charts>;

  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      let toolTipSet = new Set(this.charts.value.map(a => a.productgroup).filter(x => x != "0"));
      this.ProductGroupList = [];
      toolTipSet.forEach(item => {
        if (item)
          this.ProductGroupList.push(item);
      });
      toolTipSet = new Set(this.charts.value.map(a => a.theme).filter(x => x != "0"));
      this.ThemeList = [];
      toolTipSet.forEach(item => {
        if (item)
          this.ThemeList.push(item);
      });
      toolTipSet = new Set(this.charts.value.map(a => a.season).filter(x => x != "0"));
      this.SeasonList = [];
      toolTipSet.forEach(item => {
        if (item)
          this.SeasonList.push(item);
      });
      toolTipSet = new Set(this.charts.value.map(a => a.gender).filter(x => x != "0"));
      this.GenderList = [];
      toolTipSet.forEach(item => {
        if (item)
          this.GenderList.push(item);
      });
      toolTipSet = new Set(this.charts.value.map(a => a.plc).filter(x => x != "0"));
      this.PlcList = [];
      toolTipSet.forEach(item => {
        if (item)
          this.PlcList.push(item);
      });
      toolTipSet = new Set(this.charts.value.map(a => a.countryoforigin).filter(x => x != "0"));
      this.CountryofOriginList = [];
      toolTipSet.forEach(item => {
        if (item)
          this.CountryofOriginList.push(item);
      });
    }
  }

  constructor(private _chartService: ChartService) {

  }

  getData(): Observable<Charts> {
    let data = new Charts();
    data.context = this.charts.context;
    data.nextLink = this.charts.nextLink;
    data.value = this.charts.value;
    data.Chartdata = new Object();
    let toolTipSet, dataCount, widgetdata;
    widgetdata = this.charts.filteredValue;
    if (this.ProductGroups)
      widgetdata = widgetdata.filter(a => a.productgroup == this.ProductGroups);
    if (this.Themes)
      widgetdata = widgetdata.filter(a => a.theme == this.Themes);
    if (this.Seasons)
      widgetdata = widgetdata.filter(a => a.season == this.Seasons);
    if (this.Genders)
      widgetdata = widgetdata.filter(a => a.gender == this.Genders);
    if (this.Plcs)
      widgetdata = widgetdata.filter(a => a.plc == this.Plcs);
    if (this.CountryofOrigins)
      widgetdata = widgetdata.filter(a => a.countryoforigin == this.CountryofOrigins);

    data.filteredValue = widgetdata;								
    toolTipSet = new Set(widgetdata.map(a => a.productsubcategory));
    let toolTip = new Array<string>();
    toolTipSet.forEach(item => {
      toolTip.push(item);
    });

    dataCount = new Array<number>();
    toolTipSet.forEach(item => {
      dataCount.push(widgetdata.map(a => a.productsubcategory).filter(x => x == item.toString()).length);
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
    this.obscharts = Observable.of(data);
    return this.obscharts;
  }
  // events
  public onProductGroupsChange(ProductGroup) {
    if (ProductGroup) {
      this.ProductGroups = ProductGroup;
      this.setData();
    }
  }

  public onThemesChange(Theme) {
    if (Theme) {
      this.Themes = Theme;
      this.setData();
    }
  }
  public onSeasonsChange(Season) {
    if (Season) {
      this.Seasons = Season;
      this.setData();
    }
  }
  public onGendersChange(Gender) {
    if (Gender) {
      this.Genders = Gender;
      this.setData();
    }
  }
  public onPlcsChange(Plc) {
    if (Plc) {
      this.Plcs = Plc;
      this.setData();
    }
  }
  public onCountryofOriginsChange(CountryofOrigin) {
    if (CountryofOrigin) {
      this.CountryofOrigins = CountryofOrigin;
      this.setData();
    }
  }

  setData() {
    this.getData().subscribe(result => {
      this.updateCharts = result;
      this.filter.emit(this.updateCharts);
    });
  }

  Load_More() {
    this._chartService.getChartData(this.charts.nextLink).subscribe(charts => {
      this.charts.nextLink = charts["@odata.nextLink"];
      if (charts["value"]) {
        charts["value"].forEach(element => {
          if (element)
            this.charts.value.push(element);
        });
      }
      this.setData();
    });
  }

}
