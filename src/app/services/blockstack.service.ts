import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig, UserSession } from 'blockstack';
import { showBlockstackConnect } from '@blockstack/connect';
import * as moment from 'moment';
import { Constants } from "../common/constants";
import { RestService } from "../services/rest.services";
import { Console } from 'console';
import * as CryptoJS from 'crypto-js';
import { useConnect } from '@blockstack/connect';
import { authenticate } from '@blockstack/connect';




@Injectable({
  providedIn: 'root'
})
export class BlockstackService {

  // UserSession
  userSession;
  userSessionToken;
  data: any;

  /**
   * Constructor
   */
  constructor(private restService: RestService, private router: Router, @Inject('LOCALSTORAGE') private localStorage: Storage) {
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

      this.router.navigate(["/home"]);
    }

  }

  /**
  * Blockstack Login
  */

  signup() {
    const authOptions = {
      redirectTo: '/',
      manifestPath: '/manifest.json',
      //authOrigin: "http://localhost:4200/",
      userSession: this.userSession,
      sendToSignIn: false,
      finished: async ({ userSession }) => {
        this.data = userSession.loadUserData();
        this.storeUserDetailsFireStore();
      },
      appDetails: {
        name: 'Waitabit',
        icon: './assets/images/logo.png'
      }
    };

    // authenticate(authOptions)
    showBlockstackConnect(authOptions);
    //this.userSession.redirectToSignIn();
  }

  login() {
    // Login page of Blockstack
    //new blockstack auth
    const authOptions = {
      redirectTo: '/',
      manifestPath: '/manifest.json',
      //authOrigin: "http://localhost:4200/",
      userSession: this.userSession,
      sendToSignIn: true,
      finished: async ({ userSession }) => {
        this.data = userSession.loadUserData();
        this.storeUserDetailsFireStore();
      },
      appDetails: {
        name: 'Waitabit',
        icon: './assets/images/logo.png'
      }
    };
    authenticate(authOptions)
    //showBlockstackConnect(authOptions);
    //  this.userSession.redirectToSignIn();
  }

  /**
   * Blockstack Logout
   */
  logout() {
    // Logout
    console.log("In lout function")
    this.userSession.signUserOut();
    this.localStorage.removeItem('currentUser');
    this.localStorage.removeItem('sessionToken');
    this.router.navigate(['']);
  }


  async storeUserDetailsFireStore() {
    console.log("storeUserDetailsFireStore")
    var payload = this.data
    console.log(payload);
    this.restService
      .postwo(Constants.DOMAIN_URL + Constants.CLIENT_SIGNUP, payload)
      .subscribe(
        (data: any) => {
          console.log(data.session);
          this.userSessionToken = data.session;
          this.localStorage.setItem('currentUser', JSON.stringify(
            this.data));
          this.localStorage.setItem('sessionToken', data.session);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error.error.message);
          this.localStorage.removeItem('blockstack-session');

          this.userSession.signUserOut();
        }
      );

  }
}
