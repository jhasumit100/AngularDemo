import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Charts } from '../../Data/charts';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { StyleData } from '../../Data/widget-data';

@Component({
  selector: 'data-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  displayedColumns = ['id', 'code', 'name', 'desc', 'productgroup', 'productsubcategory', 'theme', 'season', 'gender', 'plc', 'countryoforigin'];
  charts: Charts;
  datasource;
  @ViewChild(MatPaginator) private _paginator;
  pager: any = {};
  pagedItems: any[];
  @Input('charts')
  set in(charts) {
    if (charts) {
      this.charts = charts;
      this.datasource = new MatTableDataSource(this.charts.filteredValue);
      this.datasource.paginator = this._paginator;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
