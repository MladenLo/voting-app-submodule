import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css']
})
export class EditPollComponent implements OnInit {
  statusMessage; //After adding is complete, or we have error, show it to the user
  optionsForEdit = "";
  pollID;
  title: string;
  message: string;
  public editPollForm;
  @Input() poll;
  @Output() onEditClick = new EventEmitter();

  constructor() {}
  ngOnChanges() {
    this.pollID = this.poll['_id'];
    this.title = this.poll['title'];
    this.optionsForEdit = "";
    for(let i = 0; i < this.poll['options'].length; i++) {
      this.optionsForEdit += this.poll['options'][i].optionName;
      if(i + 1 != this.poll['options'].length) {
        this.optionsForEdit += "|";
      }
    }
    
    this.editPollForm = new FormGroup({
      title: new FormControl(this.title, [
          Validators.required,
          Validators.minLength(2), 
          Validators.maxLength(255)
        ]
      ),
      options: new FormControl(this.optionsForEdit, [
        Validators.required
      ]),
    });
  }

  ngOnInit() {}
  
  sendForEdit(){
    this.onEditClick.emit({
      pollID: this.pollID,
      pollTitle: this.editPollForm.value.title,
      pollOptions: this.editPollForm.value.options
    });
  }
}
