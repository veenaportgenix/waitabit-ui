import { Component, Inject, OnInit } from '@angular/core';
import { BlockstackService } from 'src/app/services/blockstack.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userId;
  public emailId;
  constructor(private blockstackService: BlockstackService,@Inject('SESSIONSTORAGE') private sessionStorage: Storage) { }

  ngOnInit() {
    let userData =this.blockstackService.userSession.loadUserData();
    this.userId=userData.username

    
  }
  getEmail()
  {
    const existingData = sessionStorage.getItem("waitabit-session");
    if(existingData) {
      const data = JSON.parse(existingData);
        this.emailId= data.app_email;
    }
  }

}
