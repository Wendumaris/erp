
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, ApiResponse } from '../../../models';
import { Customers } from '../../../providers';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
})
export class CustomerDetailComponent implements OnInit {

  record: Customer;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public customers: Customers) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.customers.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['customer/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`customer/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
