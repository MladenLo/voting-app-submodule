import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-public-poll',
  templateUrl: './public-poll.component.html',
  styleUrls: ['./public-poll.component.css']
})
export class PublicPollComponent implements OnInit {
  selectedPoll;
  doubleVote: boolean;
  isDoneLoading: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _pollService: PollService, public _router: Router) { }

  ngOnInit() {
    this.initiatePoll();
  }
  initiatePoll() {
    this._activatedRoute.params.subscribe((params: Params) => {
        let pollId = params['id'];
        //let userId = params['userId'];
        this._pollService.getPoll(pollId).subscribe(value  => {
          if(value.successfulRequest) {
            this.selectedPoll = value.thePoll;
            if(value.thePoll['options'].length > 0) {
              for(var i = 0; i < value.thePoll['options'].length; i++) {
                this.labels.push(value.thePoll['options'][i].optionName);
                this.datasets[0].data.push(value.thePoll['options'][i].optionVote);
              }
            }
          }
          this.isDoneLoading = true;
        });
    });
  }
  private datasets = [
    {
      label: "# of Votes",
      data: []
    }
  ];
  //Charts code
  private labels = [];

  private options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  
  vote(id, label) {
    this.isDoneLoading = false;
    this.labels = [];
    this.datasets[0].data = [];
    this._pollService.vote(id, label).subscribe(value  => {
      if(value.successfulRequest && !value.doubleVote) {
        this.initiatePoll();
      } else if (value.successfulRequest && value.doubleVote) {
        this.initiatePoll();
        this.doubleVote = true;
      }
    });
  }
}
