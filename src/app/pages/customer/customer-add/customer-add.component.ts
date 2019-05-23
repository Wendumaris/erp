import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption, ApiResponse } from '../../../models';
import { Customers } from '../../../providers';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  addForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
          private router: Router,
          public customers: Customers,
          public dialog: MatDialog) {
            this.addForm = this.formBuilder.group({
              customer_type: [null],
              title: [null],
              surname: ['', Validators.required],
              other_name: ['', Validators.required],
              gender: ['', Validators.required],
              birth_date: [null],
              phone: ['', Validators.required],
              phone_personal: [null],
              email: [null],
              contact_person: ['', Validators.required],
              contact_person_phone: ['', Validators.required],
              address: ['', Validators.required],
              country_iso2: [null],
            });
    }

  ngOnInit() {
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
      payload.is_pmt_client = true;
      payload.password = payload.phone;
      console.log(payload);
      this.customers.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`customer/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`customer/edit/${record.id}`]);
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
