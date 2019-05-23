import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Customers } from '../../../providers';
import { Customer, ApiResponse } from '../../../models';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  editForm: FormGroup;
  record: Customer;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public customers: Customers,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialog: MatDialog) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.customers.query({ id })[0];
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

  setForm() {

    const now = new Date(this.record.birth_date);
    const birthDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.editForm.get('customer_type').setValue(this.record.customer_type || '');
    this.editForm.get('title').setValue(this.record.title || '');
    this.editForm.get('surname').setValue(this.record.surname || '');
    this.editForm.get('other_name').setValue(this.record.other_name || '');
    this.editForm.get('gender').setValue(this.record.gender || '');
    this.editForm.get('birth_date').setValue(birthDate);
    this.editForm.get('phone').setValue(this.record.phone || '');
    this.editForm.get('phone_personal').setValue(this.record.phone_personal || '');
    this.editForm.get('email').setValue(this.record.email || '');
    this.editForm.get('contact_person').setValue(this.record.contact_person || '');
    this.editForm.get('contact_person_phone').setValue(this.record.contact_person_phone || '');
    this.editForm.get('address').setValue(this.record.address || '');
    this.editForm.get('country_iso2').setValue(this.record.country_iso2 || '');
  }

  createForm() {
    this.editForm = this.formBuilder.group({
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

onSubmit() {
  this.loading = true;
  const payload = this.editForm.value;
  try {
    if (payload.birth_date){
      const ngbDate = this.editForm.controls['birth_date'].value;
      payload.birth_date = this.ngbDateParserFormatter.format(ngbDate);
    }
    payload.is_pmt_client = true;
    console.log(payload);
    this.customers.recordUpdate(this.record, payload).then((res: ApiResponse) => {
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
