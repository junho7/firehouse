import { Component } from '@angular/core';
import { FirehouseService } from 'firehouse';
import { FirehouseTestService } from 'projects/firehouse/src/public_api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firehouse-app';

  constructor(
    public ft: FirehouseTestService
  ) {
    window['comp'] = this;

    ft.run();
  }
}


