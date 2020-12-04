import { Component, OnInit } from '@angular/core';
import { BlockstackService } from 'src/app/services/blockstack.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userId;
  constructor(private blockstackService: BlockstackService) { }

  ngOnInit() {
    let userData =this.blockstackService.userSession.loadUserData();
    this.userId=userData.username
    
  }

}
