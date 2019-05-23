import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { PmtBooking, ApiResponse } from '../../models';
import { PmtBookings } from '../../providers';


@Component({
  selector: 'app-pmt-booking',
  templateUrl: './pmt-booking.component.html',
  styleUrls: ['./pmt-booking.component.scss']
})
export class PmtBookingComponent implements OnInit {


  searchForm: FormGroup;
  currentRecords: Array<PmtBooking> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pmtBookings: PmtBookings) {
      this.currentRecords = this.pmtBookings.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (pmtBooking: PmtBooking) => {
      let name = pmtBooking.title ? pmtBooking.title + '. ' : '';
      name += `${pmtBooking.surname} ${pmtBooking.other_name}`;
      const gender = pmtBooking.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.pmtBookings.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.pmtBookings.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['pmt-booking/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`pmt-booking/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`pmt-booking/edit/${record.id}`]);
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
