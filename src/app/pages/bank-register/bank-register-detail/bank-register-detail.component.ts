
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankRegister, ApiResponse } from '../../../models';
import { BankRegisters } from '../../../providers';

@Component({
  selector: 'app-bank-register-detail',
  templateUrl: './bank-register-detail.component.html',
})
export class BankRegisterDetailComponent implements OnInit {

  record: BankRegister;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public bankRegisters: BankRegisters) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bankRegisters.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['bank-register/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`bank-register/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
