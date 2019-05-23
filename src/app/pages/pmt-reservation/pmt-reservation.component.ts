import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { PmtReservation, ApiResponse } from '../../models';
import { PmtReservations } from '../../providers';


@Component({
  selector: 'app-pmt-reservation',
  templateUrl: './pmt-reservation.component.html',
  styleUrls: ['./pmt-reservation.component.scss']
})
export class PmtReservationComponent implements OnInit {


  searchForm: FormGroup;
  currentRecords: Array<PmtReservation> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pmtReservations: PmtReservations) {
      this.currentRecords = this.pmtReservations.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (pmtReservation: PmtReservation) => {
      let name = pmtReservation.title ? pmtReservation.title + '. ' : '';
      name += `${pmtReservation.surname} ${pmtReservation.other_name}`;
      const gender = pmtReservation.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.pmtReservations.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.pmtReservations.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['pmt-reservation/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`pmt-reservation/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`pmt-reservation/edit/${record.id}`]);
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
