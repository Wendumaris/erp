import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankRegister, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class BankRegisters {

  bankRegisters: BankRegister[] = [];

  constructor(private apiService: ApiService) {
    const bankRegisters = []; // Initial Values
    for (const bankRegister of bankRegisters) {
      this.bankRegisters.push(new BankRegister(bankRegister));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.bankRegisters;
    }
    return this.bankRegisters.filter((bankRegister) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = bankRegister[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return bankRegister;
            } else if (field === params[key]) {
              return bankRegister;
            }
          }
      }
      return null;
    });
  }

  add(bankRegister: BankRegister) {
    this.bankRegisters.push(bankRegister);
  }

  delete(bankRegister: BankRegister) {
    this.bankRegisters.splice(this.bankRegisters.indexOf(bankRegister), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getBankRegister(queryString).pipe(
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
    const proRes = this.apiService.postBankRegister(data).pipe(
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

  async recordUpdate(bankRegister: BankRegister, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateBankRegister(bankRegister.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(bankRegister);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
