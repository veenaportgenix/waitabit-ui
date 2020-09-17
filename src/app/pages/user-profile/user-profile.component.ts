import { Component, OnInit ,Injectable,Inject} from '@angular/core';

import { RestService } from "../../services/rest.services";
import { Constants } from "../../common/constants";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 url;

  constructor( private restService: RestService,@Inject('LOCALSTORAGE') private localStorage: Storage) { }

  ngOnInit() {
    this.generateApiKey();
  }
  
  
  
  generateApiKey()
  {
this.url="http://portgenix.com"
    console.log("storeUserDetailsFireStore")
    console.log(this.restService.sessionToken)
    var payload = 
    {
      url:this.url
    }
    console.log(payload);
    this.restService
      .post(Constants.DOMAIN_URL + Constants.CLIENT_GENERATE_API_KEY,payload)
      .subscribe(
        (data: any) => {
          console.log(data);
        
        },
        (error) => {
       console.log(error);
       
      
        }
      );
  
  }
}
