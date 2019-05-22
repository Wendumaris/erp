import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Drivers {

  drivers: Driver[] = [];

  constructor(private apiService: ApiService) {
    const drivers = []; // Initial Values
    for (const driver of drivers) {
      this.drivers.push(new Driver(driver));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.drivers;
    }
    return this.drivers.filter((driver) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = driver[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return driver;
            } else if (field === params[key]) {
              return driver;
            }
          }
      }
      return null;
    });
  }

  add(driver: Driver) {
    this.drivers.push(driver);
  }

  delete(driver: Driver) {
    this.drivers.splice(this.drivers.indexOf(driver), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getDriver(queryString).pipe(
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

}
