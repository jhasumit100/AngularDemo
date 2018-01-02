import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Response } from '@angular/http';


@Injectable()
export class oDataService {
  data;
  constructor(private http: Http) {
  }

  fetchData(url: string) {
    return this.http.get(url)
      .map((res): Response => { return res.json() });
  }

}