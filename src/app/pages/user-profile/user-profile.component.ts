import { Component, OnInit, Injectable, Inject } from '@angular/core';

import { RestService } from "../../services/rest.services";
import { Constants } from "../../common/constants";
import { Router } from '@angular/router';
import { BlockstackService } from 'src/app/services/blockstack.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public appName: string;
  public appUrl: string;
  public appProdApiKey: string;
  public appDevApiKey: string;
  showApiKey: boolean;
  model: any = {};


  constructor(private router: Router, private blockstackService: BlockstackService, private restService: RestService, @Inject('LOCALSTORAGE') private localStorage: Storage) { }

  ngOnInit() {
    this.getApiKey();


  }

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  generateApiKey() {

    console.log("storeUserDetailsFireStore")
    console.log(this.restService.sessionToken)
    var payload =
    {
      appName: this.appName,
      url: this.appUrl
    }
    console.log(payload);
    this.restService
      .post(Constants.DOMAIN_URL + Constants.CLIENT_GENERATE_API_KEY, payload)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.appProdApiKey = data.default_app.prod_api_key;
          this.appDevApiKey = data.default_app.dev_api_key;
          this.appUrl = data.default_app.provided_url;
          this.appName = data.default_app.app_name;
          this.showApiKey = true;
        },
        (error) => {
          console.log(error);
        }
      );

  }

  getApiKey() {
    console.log("Fetching API Key")
    this.restService
      .get(Constants.DOMAIN_URL + Constants.CLIENT_SHOW_GENERATED_API_KEY)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.showApiKey = true;
          this.appProdApiKey = data.prod_api_key;
          this.appDevApiKey = data.dev_api_key;
          this.appUrl = data.provided_url;
          this.appName = data.app_name;
        },
        (error) => {
          //token expires
          if (error.status === 401) {
            this.showApiKey = false;
            this.blockstackService.logout()
            this.router.navigate(['home']);
          } else {
            console.log(error)
          }
        }
      );

  }
}
