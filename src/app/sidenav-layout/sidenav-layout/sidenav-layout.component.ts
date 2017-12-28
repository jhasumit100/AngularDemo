import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SidenavToggleService } from '../sidenav-toggle.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.css']
})
export class SidenavLayoutComponent implements OnInit {

  @ViewChild(MatSidenav) private sidenav: MatSidenav;

  constructor(private toggleService: SidenavToggleService) {
      
  }

  ngOnInit() {
    this.toggleService.subscribe(() => this.sidenav.toggle())
  }
}