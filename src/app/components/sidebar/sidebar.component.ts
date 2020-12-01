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
  { path: '/api-information', title: 'API Information', icon: 'ni-key-25 text-yellow', class: '' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/user-profile', title: 'My Profile', icon: 'ni-key-25 text-yellow', class: '' },
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
  isLoggedIn = false;
  constructor(private router: Router, private blockstackService: BlockstackService) {
    
  }

  ngOnInit() {
    let userData =this.blockstackService.userSession.loadUserData();
    this.user=userData.username
    this.isLoggedIn = true
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
