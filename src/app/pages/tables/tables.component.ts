import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { BlockstackService } from 'src/app/services/blockstack.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  waitListData = [];
  local: any
  constructor(private appService: AppService, private blockstackService: BlockstackService) {
  }

  ngOnInit() {
    this.getFile();
    /* let value  = 100  
   let a = []; 
   for(let i = 1; i < value; ++i) { 
     this.data={
       "priority": i,
       "referral_link": "https://cryptoally.io/?&ref_id=AA7T4",
       "registered_email": "bani@getwaitlist.com",
       "total_waiters_currently": i - 2,
       "createdAt":"23/4/2020",
       "noReferred": 2
       }
       this.waitListData.push(this.data)
   } */
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }


  getFile() {
    let options = { decrypt: true };
    this.blockstackService.userSession.getFile("Dc4bc71d2.json").then(data => {
      if (data) {
        const user = JSON.parse(data);
        console.log(user)
        for (let i = 0; i < user.records.length; ++i) {
          this.local = {
            "priority": user.records[i].rank,
            "referral_link": user.records[i].ref_id,
            "registered_email": user.records[i].email_id,
            "createdAt": user.records[i].created_at,
            "noReferred": user.records[i].users_referred
          }
          this.waitListData.push(this.local)
        }
        this.sortByKey(this.waitListData, "priority");
      } else {
        const user = {};

      }
    });
  }

  download() {
    this.appService.downloadFile(this.waitListData, 'WaitListData');
  }
}
