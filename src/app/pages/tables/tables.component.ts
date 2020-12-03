import { Component, OnInit } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { BlockstackService } from 'src/app/services/blockstack.service';

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
 showRecords=false;
  constructor(private appService: AppService, private blockstackService: BlockstackService) {
  }

  ngOnInit() {
    this.getFile();
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
          this.showRecords=true;
        }
        this.sortByKey(this.waitListData, "priority");
      } else {
        this.showRecords=false;

      }
    });
  }

  export() {
    this.appService.downloadFile(this.waitListData, 'WaitListData');
  }
}
