import {
  Component,
  OnInit,
  HostListener,
  HostBinding,
  Inject,
  Input
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { WINDOW_PROVIDERS, WINDOW } from "../../helpers/window.helpers";
import { BlockstackService } from 'src/app/services/blockstack.service';
import { Router } from '@angular/router';
import { useConnect } from '@blockstack/connect';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isFixed;
  public isCollapsed = true;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    public router: Router,
    public blockstackService: BlockstackService
  ) { }

  ngOnInit() { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (offset > 10) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }

  @HostBinding("class.menu-opened") menuOpened = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
  hidemenu() {
    this.isCollapsed = true;
  }

  login() {
    //debugger
    if (this.blockstackService.userSession.isUserSignedIn()) {
      let userData = this.blockstackService.userSession.loadUserData();
      this.router.navigate(['dashboard']);
    } else if (!this.blockstackService.userSession.isUserSignedIn() && this.blockstackService.userSession.isSignInPending()) {
      // If it is in progress
      this.blockstackService.userSession.handlePendingSignIn()
        .then((userData) => {
          console.log(userData)
          this.router.navigate(['dashboard']);
        });
    } else {
      this.blockstackService.login();
    }
  }

  signup() {
    this.blockstackService.signup();
  }
}
