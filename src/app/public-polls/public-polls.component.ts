import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-public-polls',
  templateUrl: './public-polls.component.html',
  styleUrls: ['./public-polls.component.css']
})
export class PublicPollsComponent implements OnInit {
  allPolls = [];

  constructor(public _pollService: PollService, public _router: Router) { }
  
  ngOnInit() {
    this.getAllPolls();
  };
  
  getAllPolls() {
    let getAllUsers;
    this._pollService.getAllPolls()
      .subscribe(value  => {
          if(value.successfulRequest) {
            for(let i = 0; i < value.usersWithPolls.length; i++) {
              if(value.usersWithPolls[i]['polls'].length > 0) {
                for(let j = 0; j < value.usersWithPolls[i]['polls'].length; j++) {
                  this.allPolls.push({
                    poll: value.usersWithPolls[i]['polls'][j],
                    userId: value.usersWithPolls[i]['_id']
                  });
                }
              }
            }
          }
        }
      );
  }
  
  showPoll(id, userId) {
    this._router.navigate(['/public/all', id]);
  }
}
