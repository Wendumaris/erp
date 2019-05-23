import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { State } from '../../models';
import { States } from '../../providers';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<State> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public states: States) {
      this.currentRecords = this.states.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    search(data) {
      const val = data.searchString;
      console.log(val);
      if (!val || !val.trim()) {
        this.currentRecords = this.states.query();
      } else {
        this.currentRecords = this.states.query({
          name: val
        });
      }
      this.timedAlert('Response', `${this.currentRecords.length} record(s) found!`);
      return;
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
