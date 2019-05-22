import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmtBoarding, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class PmtBoardings {

  pmtBoardings: PmtBoarding[] = [];

  constructor(private apiService: ApiService) {
    const pmtBoardings = []; // Initial Values
    for (const pmtBoarding of pmtBoardings) {
      this.pmtBoardings.push(new PmtBoarding(pmtBoarding));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.pmtBoardings;
    }
    return this.pmtBoardings.filter((pmtBoarding) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = pmtBoarding[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return pmtBoarding;
            } else if (field === params[key]) {
              return pmtBoarding;
            }
          }
      }
      return null;
    });
  }

  add(pmtBoarding: PmtBoarding) {
    this.pmtBoardings.push(pmtBoarding);
  }

  delete(pmtBoarding: PmtBoarding) {
    this.pmtBoardings.splice(this.pmtBoardings.indexOf(pmtBoarding), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPmtBoarding(queryString).pipe(
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
    const proRes = this.apiService.postPmtBoarding(data).pipe(
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

  async recordUpdate(pmtBoarding: PmtBoarding, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updatePmtBoarding(pmtBoarding.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtBoarding);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(pmtBoarding: PmtBoarding, payload): Promise<ApiResponse> {
    const proRes = this.apiService.deletePmtBoarding(pmtBoarding.id).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(pmtBoarding);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
