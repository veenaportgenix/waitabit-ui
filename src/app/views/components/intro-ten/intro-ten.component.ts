import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Component, OnInit } from '@angular/core';
import { BlockstackService } from 'src/app/services/blockstack.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-intro-ten',
  templateUrl: './intro-ten.component.html',
  styleUrls: ['./intro-ten.component.scss'],
  animations: [SharedAnimations]
})
export class IntroTenComponent implements OnInit {

  constructor(private router: Router, private blockstackService: BlockstackService) { }

  ngOnInit() {
  }


  signin() {
    if (this.blockstackService.userSession.isUserSignedIn()) {
      let userData = this.blockstackService.userSession.loadUserData();
      
      this.router.navigate(['/dashboard']);
    } else if (!this.blockstackService.userSession.isUserSignedIn() && this.blockstackService.userSession.isSignInPending()) {
      // If it is in progress
      this.blockstackService.userSession.handlePendingSignIn()
        .then((userData) => {
          this.router.navigate(['/dashboard']);
        });
    } else {
      this.blockstackService.signup();
    }
  }

 

}
