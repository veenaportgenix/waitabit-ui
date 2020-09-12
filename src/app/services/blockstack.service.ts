import { Injectable,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig, UserSession } from 'blockstack';
import { showBlockstackConnect } from '@blockstack/connect';
import * as moment from 'moment';
import { Constants } from "../common/constants";
import { RestService } from "../services/rest.services";
import { Console } from 'console';



@Injectable({
  providedIn: 'root'
})
export class BlockstackService {

  // UserSession
  userSession;
  data:any;

  /**
   * Constructor
   */
  constructor( private restService: RestService,private router: Router,@Inject('LOCALSTORAGE') private localStorage: Storage) {
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
        this.data = userSession.loadUserData();
        //console.log(this.data)

        


        this.localStorage.setItem('currentUser', JSON.stringify(
      this.data));

        //call to backend to store it
        this.storeUserDetailsFireStore();

        this.router.navigate(['/dashboard']);
      },
      appDetails: {
        name: 'Waitabit',
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


  storeUserDetailsFireStore()
  {
    console.log("storeUserDetailsFireStore")
    var payload =  this.data
    console.log(payload);
    this.restService
      .post(Constants.DOMAIN_URL + Constants.CLIENT_LOGIN, payload)
      .subscribe(
        (data: any) => {
          console.log("Stored in firestore");
        },
        (error) => {
          console.log("failed to get data")  
        }
      );
  
  }
}
