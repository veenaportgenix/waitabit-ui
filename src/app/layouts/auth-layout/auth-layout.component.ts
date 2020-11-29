import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BlockstackService } from 'src/app/services/blockstack.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router, private blockstackService: BlockstackService) { }

  ngOnInit() {


    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

  }
  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }



  signin() {
    if (this.blockstackService.userSession.isUserSignedIn()) {
      let userData = this.blockstackService.userSession.loadUserData();
      console.log(userData)
      console.log(userData.username)
      this.router.navigate(['/dashboard']);
    } else if (!this.blockstackService.userSession.isUserSignedIn() && this.blockstackService.userSession.isSignInPending()) {
      // If it is in progress
      this.blockstackService.userSession.handlePendingSignIn()
        .then((userData) => {
          console.log(userData)
          this.router.navigate(['/dashboard']);
        });
    } else {
      this.blockstackService.login();
    }
  }
}
