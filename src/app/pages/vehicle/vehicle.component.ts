import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { Vehicle, Driver } from '../../models';
import { Vehicles } from '../../providers';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Vehicle> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public vehicles: Vehicles) {
      this.currentRecords = this.vehicles.query();
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
        this.currentRecords = this.vehicles.query();
      } else {
        this.currentRecords = this.vehicles.query({
          name: val
        });
      }
      this.timedAlert('Response', `${this.currentRecords.length} record(s) found!`);
      return;
    }

    getName = (driver: Driver) => {
      const name = `${driver.surname} ${driver.other_name}`;
      return name.split(' ')
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ');
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
