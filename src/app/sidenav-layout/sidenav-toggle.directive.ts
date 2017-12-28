import { Directive, HostListener, Input } from '@angular/core';
import { SidenavToggleService } from './sidenav-toggle.service';


@Directive({
  selector: '[appSidenavToggle]'
})
export class SidenavToggleDirective {

  constructor(private toggleService: SidenavToggleService) {
  }

  @HostListener('click') onClick() {
    this.toggleService.toggleSidenav();
  }
}