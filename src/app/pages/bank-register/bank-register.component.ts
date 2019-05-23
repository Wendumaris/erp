import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { BankRegister, ApiResponse } from '../../models';
import { BankRegisters } from '../../providers';

@Component({
  selector: 'app-bank-register',
  templateUrl: './bank-register.component.html',
  styleUrls: ['./bank-register.component.scss']
})
export class BankRegisterComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<BankRegister> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public bankRegisters: BankRegisters) {
      this.currentRecords = this.bankRegisters.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (bankRegister: BankRegister) => {
      let name = bankRegister.title ? bankRegister.title + '. ' : '';
      name += `${bankRegister.surname} ${bankRegister.other_name}`;
      const gender = bankRegister.gender === 'MALE' ? 'm' : 'f';
      name += ` (${gender})`;
      return name;
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.bankRegisters.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.bankRegisters.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['bank-register/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`bank-register/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`bank-register/edit/${record.id}`]);
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
