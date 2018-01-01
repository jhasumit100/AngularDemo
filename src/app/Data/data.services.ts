import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { RequestOptions,Response } from '@angular/http';


@Injectable()
export class oDataService {
  data;
  constructor(private http: Http) { 
  }

  fetchData() {    
    return this.http.get('http://test.wfxondemand.com/oDataService/Products').map((res) : Response => { return res.json()} );
  }

}