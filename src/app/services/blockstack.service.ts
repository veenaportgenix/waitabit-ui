import { Injectable,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig, UserSession } from 'blockstack';
import { showBlockstackConnect } from '@blockstack/connect';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class BlockstackService {

  // UserSession
  userSession;

  /**
   * Constructor
   */
  constructor(private router: Router,@Inject('LOCALSTORAGE') private localStorage: Storage) {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    this.userSession = new UserSession({ appConfig: appConfig });

    // BS Login Module
    if (!this.userSession.isUserSignedIn() && this.userSession.isSignInPending()) {

      // If it is in progress
      this.userSession.handlePendingSignIn()
        .then((userData) => {
          console.log(userData)
          if (!userData.username) {
            throw new Error('This app requires a username.')
          }
        });

      // Redirect to previous page
      this.router.navigate([""]);
    }

  }

  /**
  * Blockstack Login
  */
  login() {

    // Login page of Blockstack
    //new blockstack auth

    const authOptions = {
      redirectTo: '/',
      manifestPath: '/manifest.json',
      //authOrigin: "http://localhost:4200/",
      userSession: this.userSession,
      finished: async ({ userSession }) =>
      {
        let data = userSession.loadUserData();
        console.log(data)

        //url: https://us-central1-app-4-5933c.cloudfunctions.net/waitabit


        this.localStorage.setItem('currentUser', JSON.stringify({
          token: '',
          isAdmin: false,
          email: 'john.doe@gmail.com',
          id: '12312323232',
          expiration: moment().add(1, 'days').toDate(),
          fullName: data.username
        }));
        //call to backend to store it
        this.router.navigate(['/dashboard']);
      },
      appDetails: {
        name: 'DeWaitList',
        icon: 'https://dewaitlist.com/favicon.ico'

      }
    };
    showBlockstackConnect(authOptions);
    //this.userSession.redirectToSignIn();
  }

  /**
   * Blockstack Logout
   */
  logout() {
    // Logout
    console.log("In lout function")
    this.userSession.signUserOut();
    this.router.navigate(['/#/register']);
  }
}
