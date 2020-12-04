import { Component, Inject, OnInit } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/common/constants';
import { AppService } from 'src/app/services/app.service';
import { BlockstackService } from 'src/app/services/blockstack.service';
import { RestService } from "../../services/rest.services";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  waitListData = [];
  pageSize = 25;
  page = 5;
  local: any
  showRecords = false;
  constructor(private restService: RestService,private appService: AppService, private blockstackService: BlockstackService, @Inject('SESSIONSTORAGE') private sessionStorage: Storage) {
  }

  ngOnInit() {
    this.getApiKey()
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }


  getFile(key) {
    let options = { decrypt: true };
    this.blockstackService.userSession.getFile( key + ".json").then(data => {
      if (data) {
        const user = JSON.parse(data);
        for (let i = 0; i < user.records.length; ++i) {
          this.local = {
            "priority": user.records[i].rank,
            "referral_link": user.records[i].ref_id,
            "registered_email": user.records[i].email_id,
            "createdAt": user.records[i].created_at,
            "noReferred": user.records[i].users_referred
          }

          this.waitListData.push(this.local)
          this.showRecords = true;
        }
        this.sortByKey(this.waitListData, "priority");
      } else {
        this.showRecords = false;

      }
    });
  }

  getApiKey() {
    const existingData = sessionStorage.getItem("waitabit-session")
    if(existingData) {
      const data = JSON.parse(existingData);
      this.getFile(data.prod_api_key);
    } else{
      this.restService
      .get(Constants.DOMAIN_URL + Constants.CLIENT_SHOW_GENERATED_API_KEY)
      .subscribe(
        (data: any) => {
          sessionStorage.setItem("waitabit-session",JSON.stringify(data)); 
          this.getFile(data.prod_api_key);
        },
        (error) => {
          //token expires
          if (error.status === 401) {
           
          }
        }
      );
    }
    console.log("Fetching API Key")
    
  }

  export() {
    this.appService.downloadFile(this.waitListData, 'WaitListData');
  }
}
