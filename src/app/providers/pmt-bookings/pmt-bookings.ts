import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmtBooking, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class PmtBookings {

  pmtBookings: PmtBooking[] = [];

  constructor(private apiService: ApiService) {
    const pmtBookings = []; // Initial Values
    for (const pmtBooking of pmtBookings) {
      this.pmtBookings.push(new PmtBooking(pmtBooking));
    }
    // this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.pmtBookings;
    }
    return this.pmtBookings.filter((pmtBooking) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = pmtBooking[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return pmtBooking;
            } else if (field === params[key]) {
              return pmtBooking;
            }
          }
      }
      return null;
    });
  }

  add(pmtBooking: PmtBooking) {
    this.pmtBookings.push(pmtBooking);
  }

  delete(pmtBooking: PmtBooking) {
    this.pmtBookings.splice(this.pmtBookings.indexOf(pmtBooking), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPmtBooking(queryString).pipe(
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
    const proRes = this.apiService.postPmtBooking(data).pipe(
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

  async recordUpdate(pmtBooking: PmtBooking, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updatePmtBooking(pmtBooking.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtBooking);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(pmtBooking: PmtBooking, payload): Promise<ApiResponse> {
    const proRes = this.apiService.deletePmtBooking(pmtBooking.id).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtBooking);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
