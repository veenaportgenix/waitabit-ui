import { Component, OnInit, Injectable, Inject } from '@angular/core';

import { RestService } from "../../services/rest.services";
import { Constants } from "../../common/constants";
import { Router } from '@angular/router';
import { BlockstackService } from 'src/app/services/blockstack.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-information',
  templateUrl: './api-information.component.html',
  styleUrls: ['./api-information.component.scss']
})
export class ApiInformationComponent implements OnInit {

  public appName: string;
  public appEmail: string;
  public appUrl: string;
  public appProdApiKey: string;
  public appDevApiKey: string;
  showApiKey: boolean;
  model: any = {};
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router, private blockstackService: BlockstackService, private restService: RestService) { 
    this.getApiKey();
  }

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
           
      appName: ['', Validators.required],
      appUrl: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
  });
    
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }

        this.generateApiKey();

       // display form values on success
       alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
       

   }
 
  getApiKey() {
    debugger
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
          this.appEmail = data.app_email;
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


  generateApiKey() {
    console.log("storeUserDetailsFireStore")
    console.log(this.restService.sessionToken)
    var payload =
    {
      appName: this.appName,
      url: this.appUrl,
      appEmail:this.appEmail
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
          this.appEmail = data.default_app.app_email;
          this.showApiKey = true;
        },
        (error) => {
          console.log(error);
        }
      );

  }

}
