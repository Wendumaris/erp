import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmtSchedule, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import PmtScheduleData from './table';

@Injectable()
export class PmtSchedules {

  pmtSchedules: Array<any> = [];


  constructor(public apiService: ApiService) {
    const records: Array<PmtSchedule> = PmtScheduleData;
    for (const item of records) {
      this.pmtSchedules.push(new PmtSchedule(item));
    }

    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.pmtSchedules;
    }
    return this.pmtSchedules.filter((pmtSchedule) => {
      for (const key in params) {
        const field = pmtSchedule[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return pmtSchedule;
        } else if (field == params[key]) {
          return pmtSchedule;
        }
      }
      return null;
    });
  }

  add(pmtSchedule: PmtSchedule) {
    this.pmtSchedules.push(new PmtSchedule(pmtSchedule));
  }

  delete(pmtSchedule: PmtSchedule) {
    this.pmtSchedules.splice(this.pmtSchedules.indexOf(pmtSchedule), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPmtSchedule(queryString).pipe(
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


  async recordUpdate(pmtBooking: PmtSchedule, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updatePmtSchedule(pmtBooking.id, payload).pipe(
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

  async recordDelete(pmtBooking: PmtSchedule, payload): Promise<ApiResponse> {
    const proRes = this.apiService.deletePmtSchedule(pmtBooking.id).pipe(
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
