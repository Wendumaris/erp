import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { PmtBoarding, ApiResponse } from '../../models';
import { PmtBoardings } from '../../providers';

@Component({
  selector: 'app-pmt-boarding',
  templateUrl: './pmt-boarding.component.html',
  styleUrls: ['./pmt-boarding.component.scss']
})
export class PmtBoardingComponent implements OnInit {

  addForm: FormGroup;
  sortForm: FormGroup;
  searchForm: FormGroup;
  currentRecords: Array<PmtBoarding> = [];
  customerOptions: any;
  seatOptions: any;
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pmtBoardings: PmtBoardings) {
      this.currentRecords = this.pmtBoardings.query();

      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });

      this.sortForm = this.formBuilder.group({
        vehicle_id: ['', Validators.required],
        pmt_route_id: ['', Validators.required],
        departure_date: ['', Validators.required],
        schedule_status: ['', Validators.required],
      });

      this.addForm = this.formBuilder.group({
        customer_id: ['', Validators.required],
        seat_positions: ['', Validators.required],
        seat_quantity: ['', Validators.required],
        amount: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (pmtBoarding: PmtBoarding) => {
      let name = pmtBoarding.title ? pmtBoarding.title + '. ' : '';
      name += `${pmtBoarding.surname} ${pmtBoarding.other_name}`;
      const gender = pmtBoarding.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.pmtBoardings.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.pmtBoardings.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    recordAdd(): void {
      this.router.navigate(['pmt-boarding/add']);
    }

    recordEdit(record: any): void {
      this.router.navigate([`pmt-boarding/edit/${record.id}`]);
    }

    recordDelete(record) {
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
