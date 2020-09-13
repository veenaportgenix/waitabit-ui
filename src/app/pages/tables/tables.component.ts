import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  waitListData = [];
  data:any 
  constructor() { }

  ngOnInit() {
    let value  = 100  
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
    } 
  }
}
