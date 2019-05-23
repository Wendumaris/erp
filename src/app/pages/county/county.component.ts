import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { County } from '../../models';
import { Counties } from '../../providers';

@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.scss']
})
export class CountyComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<County> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public counties: Counties) {
      this.currentRecords = this.counties.query();
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
        this.currentRecords = this.counties.query();
      } else {
        this.currentRecords = this.counties.query({
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
