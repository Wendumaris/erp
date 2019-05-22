import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Customers {

  customers: Customer[] = [];

  constructor(private apiService: ApiService) {
    const customers = []; // Initial Values
    for (const customer of customers) {
      this.customers.push(new Customer(customer));
    }
    // this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.customers;
    }
    return this.customers.filter((customer) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = customer[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return customer;
            } else if (field === params[key]) {
              return customer;
            }
          }
      }
      return null;
    });
  }

  add(customer: Customer) {
    this.customers.push(customer);
  }

  delete(customer: Customer) {
    this.customers.splice(this.customers.indexOf(customer), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getCustomer(queryString).pipe(
    map((res: ApiResponse) => {
      console.log(res);
        if (res.success && res.payload.length > 0) {
          res.payload.forEach(element => {
            this.add(element);
          });
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordCreate(data): Promise<ApiResponse> {
    const proRes = this.apiService.postCustomer(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          console.log('recordCreate() successful');
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordUpdate(customer: Customer, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateCustomer(customer.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(customer);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
