import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { BankRegisters } from '../../../providers';
import { BankRegister, ApiResponse } from '../../../models';


@Component({
  selector: 'app-bank-register-edit',
  templateUrl: './bank-register-edit.component.html',
  styleUrls: ['./bank-register-edit.component.scss']
})
export class BankRegisterEditComponent implements OnInit {

  editForm: FormGroup;
  record: BankRegister;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public bankRegisters: BankRegisters,
    public dialog: MatDialog) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.bankRegisters.query({ id })[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
      this.createForm();
  }

  ngOnInit() {
    this.setForm();
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      transaction_date: [''],
      transaction_code: [''],
      amount_realized: [null],
      amount_deposited: [null],
      deposited_date: [null],
      teller: [''],
      record_status: ['', Validators.required],
    });
}

  setForm() {
    this.editForm.get('transaction_code').setValue(this.record.transaction_code);
    this.editForm.get('transaction_date').setValue(this.record.transaction_date);
    this.editForm.get('amount_realized').setValue(this.record.amount_realized || '');
    this.editForm.get('amount_deposited').setValue(this.record.amount_deposited || '');
    this.editForm.get('deposited_date').setValue(this.record.deposited_date || '');
    this.editForm.get('teller').setValue(this.record.teller || '');
    this.editForm.get('record_status').setValue(this.record.record_status || '');
  }


onSubmit() {
  this.loading = true;
  const payload = this.editForm.value;
  try {
    console.log(payload);
    this.bankRegisters.recordUpdate(this.record, payload).then((res: ApiResponse) => {
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
