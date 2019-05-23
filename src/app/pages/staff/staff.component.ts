import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { Staff, ApiResponse } from '../../models';
import { Staffs } from '../../providers';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Staff> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public staffs: Staffs) {
      this.currentRecords = this.staffs.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (staff: Staff) => {
      const name = `${staff.surname} ${staff.other_name}`;
      return name.split(' ')
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ');
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.staffs.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.staffs.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToDetail(record: any): void {
      this.router.navigate([`staff/detail/${record.id}`]);
      return;
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
