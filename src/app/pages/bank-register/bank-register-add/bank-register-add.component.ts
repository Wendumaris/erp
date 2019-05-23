import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption, ApiResponse, Staff } from '../../../models';
import { BankRegisters } from '../../../providers';
import { AuthService } from '../../../services';


@Component({
  selector: 'app-bank-register-add',
  templateUrl: './bank-register-add.component.html',
  styleUrls: ['./bank-register-add.component.scss']
})
export class BankRegisterAddComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  user: Staff;

  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        public bankRegisters: BankRegisters,
        public dialog: MatDialog) {
            this.retrieveUser();
            console.log(this.user);
            this.addForm = this.formBuilder.group({
              transaction_date: ['', Validators.required],
              transaction_code: ['', Validators.required],
              amount_realized: [null],
              amount_deposited: [null, Validators.required],
              deposited_date: [null, Validators.required],
              teller: ['', Validators.required],
              // acknowledged_date: [null, Validators.required],
              // authorized_date: [null, Validators.required],
              // record_status: ['', Validators.required],
            });
    }

  ngOnInit() {
  }

  retrieveUser() {
    try {
      const user = this.authService.getUser();
      console.log(typeof user, user);
        this.user = Object.assign({}, user);
    } catch (e) {
      console.log(e.message);
    }
    return;
  }

  getName = (user: Staff) => {
    let name = user.title ? user.title + '. ' : '';
    name += `${user.surname} ${user.other_name}`;
    const gender = user.gender === 'MALE' ? 'm' : 'f';
    name += ` (${gender})`;
    return name;
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (this.addForm.invalid) {
      this.timedAlert('Response', 'Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      payload.depositor_id = this.user.id;
      payload.subsidiary = this.user.subsidiary;
      payload.terminal_id = this.user.terminal_id;
      console.log(payload);

      this.bankRegisters.recordCreate(payload).then((res: ApiResponse) => {
          console.log(res);
        if (res.success) {
          this.goToDetail(res.payload);
        } else {
          this.timedAlert('Response', res.message);
        }
      }, (err) => this.timedAlert('Response', err.message));
    } catch (error) {
      this.timedAlert('Response', error.message);
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`bank-register/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`bank-register/edit/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
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
