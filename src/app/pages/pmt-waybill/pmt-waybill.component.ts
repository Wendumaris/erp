import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { PmtWaybill, ApiResponse } from '../../models';
import { PmtWaybills } from '../../providers';


@Component({
  selector: 'app-pmt-waybill',
  templateUrl: './pmt-waybill.component.html',
  styleUrls: ['./pmt-waybill.component.scss']
})
export class PmtWaybillComponent implements OnInit {


  searchForm: FormGroup;
  currentRecords: Array<PmtWaybill> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pmtWaybills: PmtWaybills) {
      this.currentRecords = this.pmtWaybills.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (pmtWaybill: PmtWaybill) => {
      let name = pmtWaybill.title ? pmtWaybill.title + '. ' : '';
      name += `${pmtWaybill.surname} ${pmtWaybill.other_name}`;
      const gender = pmtWaybill.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.pmtWaybills.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.pmtWaybills.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['pmt-waybill/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`pmt-waybill/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`pmt-waybill/edit/${record.id}`]);
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
