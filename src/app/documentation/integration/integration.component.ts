import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightService } from 'src/app/services/highligher.service';
//import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, AfterViewChecked {
  
  activeTab = 'html';
  highlighted: boolean = false;

  html(activeTab){
    this.activeTab = activeTab;
  }

  result(activeTab){
    this.activeTab = activeTab;
  }
  constructor(private highlightService: HighlightService) {
   
  }
  ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

    
  //response: HighlightResult;

 

  responsecode = `{
  "email_id": "test1@gmail.com",
  "ref_id": "D1C2ewR",
  "rank": 1,
  "users_referred": 0,
  "created_at": 1601636708676,
}`
header=`X-API-TOKEN: D2849a95e
Content-Type: application/json
`

requestcode= `{
  "email": "test1@gmail.com",
  "current_url": "http://abc.com"  
}`

  ngOnInit() {
  }

}