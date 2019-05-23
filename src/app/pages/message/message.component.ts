import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { Message, ApiResponse } from '../../models';
import { Messages } from '../../providers';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Message> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public messages: Messages) {
      this.currentRecords = this.messages.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (message: Message) => {
      let name = message.title ? message.title + '. ' : '';
      name += `${message.surname} ${message.other_name}`;
      const gender = message.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.messages.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.messages.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['message/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`message/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`message/edit/${record.id}`]);
    }

    removeRecord(record) {
      console.log(record.id);
    }

  timedAlert(title, message): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: title,
        text: message,
        time: 2000
      }
    });
  }
}
