import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockstackService } from 'src/app/services/blockstack.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public user;

  constructor(private router: Router, private blockstackService: BlockstackService) {
    let userData =this.blockstackService.userSession.loadUserData();
    //console.log(userData)
    this.user=userData.username
    //this.user =
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
