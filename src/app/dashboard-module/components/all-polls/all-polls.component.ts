import { Component, OnInit } from '@angular/core';

import { PollService } from '../../../services/poll.service';

@Component({
  selector: 'app-all-polls',
  templateUrl: './all-polls.component.html',
  styleUrls: ['./all-polls.component.css']
})
export class AllPollsComponent implements OnInit {
  selectedForEditPoll;
  allPolls;
  editPollSuccess = null;
  editPollMessage = null;

  constructor(public _pollService: PollService) { }

  ngOnInit() {
    this.getAll();
  }
  
  getAll() {
    this._pollService.get_all_user_polls(localStorage.getItem('token'))
      .subscribe(value  => {
          this.allPolls = value.polls;
        }
      );
  }
  
  deletePoll(pollID) {
    this._pollService.deletePoll(pollID)
      .subscribe(value  => {
          if(value.successfulRequest) {
            for(var i = 0; i < this.allPolls.length; i++) {
              if(this.allPolls[i]['_id'] == value.removedPollID) {
                this.allPolls.splice(i, 1);
                break;
              }
            }
          }
        }
      );
  }
  
  editPoll(poll) {
    this.selectedForEditPoll = poll;
    this.editPollSuccess = null;
    this.editPollMessage = null;
  }
  
  pollEditing(event){
    this.editPollSuccess = 'pending';
    this.editPollMessage = 'Editing...';
    this._pollService.editPoll(event)
      .subscribe(value => {
        if(value.successfulRequest) {
          this.editPollSuccess = 'true';
          this.editPollMessage = value.message;
        } else {
          this.editPollSuccess = 'false';
          this.editPollMessage = value.message;
        }
      });
  }
}
