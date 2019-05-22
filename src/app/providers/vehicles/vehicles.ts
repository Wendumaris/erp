import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Vehicles {

  vehicles: Vehicle[] = [];

  constructor(private apiService: ApiService) {
    const vehicles = []; // Initial Values
    for (const vehicle of vehicles) {
      this.vehicles.push(new Vehicle(vehicle));
    }
    this.recordRetrieve().then();
  }

  query(params?: any) {
    if (!params) {
      return this.vehicles;
    }
    return this.vehicles.filter((vehicle) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = vehicle[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return vehicle;
            } else if (field === params[key]) {
              return vehicle;
            }
          }
      }
      return null;
    });
  }

  add(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
  }

  delete(vehicle: Vehicle) {
    this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getVehicle(queryString).pipe(
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
