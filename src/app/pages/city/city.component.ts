import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { City } from '../../models';
import { Cities } from '../../providers';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<City> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public cities: Cities) {
      this.currentRecords = this.cities.query();
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
        this.currentRecords = this.cities.query();
      } else {
        this.currentRecords = this.cities.query({
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
