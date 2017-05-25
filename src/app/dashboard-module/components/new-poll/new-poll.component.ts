import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PollService } from '../../../services/poll.service';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {

  constructor( public _pollService: PollService, public _router: Router ) { }

  ngOnInit() {
  }
  
  statusMessage; //After adding is complete, or we have error, show it to the user
  message: string;
    public addPollForm = new FormGroup({
      title: new FormControl(null, [
          Validators.required,
          Validators.minLength(2), 
          Validators.maxLength(255)
        ]
      ),
      options: new FormControl(null, [
        Validators.required
      ]),
    });
  
  addNewPoll() {
    this.statusMessage = null;
    this.setMessage();
    this._pollService.addNew(this.addPollForm.value.title, this.addPollForm.value.options)
      .subscribe(value  => {
        if (value.successfulRequest) {
          this.setStatusMessage(value);
          this.clearMessage();
          this._router.navigate(['/dashboard/polls/all']);
        } else {
          this.setStatusMessage(value);
          this.clearMessage();
        }
      });
  }
  
  setMessage() {
    this.message = "Adding new poll..."
  }
  clearMessage() {
    this.message = null;
  }
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }

}
