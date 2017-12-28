import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SidenavToggleService {

  private toggleEvent: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  toggleSidenav() {
    this.toggleEvent.next();
  }

  subscribe(callback: Function) {
    this.toggleEvent.subscribe(() => callback())
  }

}