import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { PmtRoute, ApiResponse } from '../../models';
import { PmtRoutes } from '../../providers';


@Component({
  selector: 'app-pmt-route',
  templateUrl: './pmt-route.component.html',
  styleUrls: ['./pmt-route.component.scss']
})
export class PmtRouteComponent implements OnInit {


  searchForm: FormGroup;
  currentRecords: Array<PmtRoute> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public pmtRoutes: PmtRoutes) {
      this.currentRecords = this.pmtRoutes.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (pmtRoute: PmtRoute) => {
      let name = pmtRoute.title ? pmtRoute.title + '. ' : '';
      name += `${pmtRoute.surname} ${pmtRoute.other_name}`;
      const gender = pmtRoute.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.pmtRoutes.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.pmtRoutes.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['pmt-route/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`pmt-route/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`pmt-route/edit/${record.id}`]);
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
