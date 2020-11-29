import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  showLoadingIndicator = true;
  constructor(private _router: Router){
    this._router.events.subscribe((routerEvent: Event ) => {
        if(routerEvent instanceof NavigationStart) {
          console.log("showLoadingIndicator: true")
          this.showLoadingIndicator = true;
        }
        if(routerEvent instanceof NavigationEnd) {
          console.log("showLoadingIndicator: false")
          this.showLoadingIndicator = false;
        }
    });
  }

  ngOnInit() {
  }

}
