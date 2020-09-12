import { Component, OnInit, ElementRef,Inject } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { JsonPipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { BlockstackService } from 'src/app/services/blockstack.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user;
  constructor(location: Location,  private element: ElementRef, private router: Router,private blockstackService: BlockstackService,@Inject('LOCALSTORAGE') private localStorage: Storage)  {
    this.location = location;
    let data=JSON.parse(this.localStorage.currentUser);
    this.user=data.username
  }

  ngOnInit() {

   
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  

   

}
