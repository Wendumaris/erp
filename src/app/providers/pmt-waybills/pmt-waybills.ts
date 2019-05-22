import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmtWaybill, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class PmtWaybills {

  pmtWaybills: PmtWaybill[] = [];

  constructor(private apiService: ApiService) {
    const pmtWaybills = []; // Initial Values
    for (const pmtWaybill of pmtWaybills) {
      this.pmtWaybills.push(new PmtWaybill(pmtWaybill));
    }
    // this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.pmtWaybills;
    }
    return this.pmtWaybills.filter((pmtWaybill) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = pmtWaybill[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return pmtWaybill;
            } else if (field === params[key]) {
              return pmtWaybill;
            }
          }
      }
      return null;
    });
  }

  add(pmtWaybill: PmtWaybill) {
    this.pmtWaybills.push(pmtWaybill);
  }

  delete(pmtWaybill: PmtWaybill) {
    this.pmtWaybills.splice(this.pmtWaybills.indexOf(pmtWaybill), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPmtWaybill(queryString).pipe(
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
    const proRes = this.apiService.postPmtWaybill(data).pipe(
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

  async recordUpdate(pmtWaybill: PmtWaybill, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updatePmtWaybill(pmtWaybill.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtWaybill);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(pmtWaybill: PmtWaybill, payload): Promise<ApiResponse> {
    const proRes = this.apiService.deletePmtWaybill(pmtWaybill.id).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtWaybill);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
