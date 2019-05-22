import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmtReservation, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class PmtReservations {

  pmtReservations: PmtReservation[] = [];

  constructor(private apiService: ApiService) {
    const pmtReservations = []; // Initial Values
    for (const pmtReservation of pmtReservations) {
      this.pmtReservations.push(new PmtReservation(pmtReservation));
    }
    // this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.pmtReservations;
    }
    return this.pmtReservations.filter((pmtReservation) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = pmtReservation[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return pmtReservation;
            } else if (field === params[key]) {
              return pmtReservation;
            }
          }
      }
      return null;
    });
  }

  add(pmtReservation: PmtReservation) {
    this.pmtReservations.push(pmtReservation);
  }

  delete(pmtReservation: PmtReservation) {
    this.pmtReservations.splice(this.pmtReservations.indexOf(pmtReservation), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPmtReservation(queryString).pipe(
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
    const proRes = this.apiService.postPmtReservation(data).pipe(
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

  async recordUpdate(pmtReservation: PmtReservation, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updatePmtReservation(pmtReservation.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtReservation);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(pmtReservation: PmtReservation, payload): Promise<ApiResponse> {
    const proRes = this.apiService.deletePmtReservation(pmtReservation.id).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtReservation);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
