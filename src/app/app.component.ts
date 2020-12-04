import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: Subject<boolean> = this.loader.isLoading;
  title = 'waitabit';
  constructor(private loader: LoaderService) {

  }

}
