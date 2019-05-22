import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { City, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Cities {

  cities: City[] = [];

  constructor(private apiService: ApiService) {
    const cities = []; // Initial Values
    for (const city of cities) {
      this.cities.push(new City(city));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.cities;
    }
    return this.cities.filter((city) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = city[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return city;
            } else if (field === params[key]) {
              return city;
            }
          }
      }
      return null;
    });
  }

  add(city: City) {
    this.cities.push(city);
  }

  delete(city: City) {
    this.cities.splice(this.cities.indexOf(city), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getCity(queryString).pipe(
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
