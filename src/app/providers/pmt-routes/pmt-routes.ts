import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmtRoute, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class PmtRoutes {

  pmtRoutes: PmtRoute[] = [];

  constructor(private apiService: ApiService) {
    const pmtRoutes = []; // Initial Values
    for (const pmtRoute of pmtRoutes) {
      this.pmtRoutes.push(new PmtRoute(pmtRoute));
    }
    this.recordRetrieve().then();
  }

  query(params?: any) {
    if (!params) {
      return this.pmtRoutes;
    }
    return this.pmtRoutes.filter((pmtRoute) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = pmtRoute[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return pmtRoute;
            } else if (field === params[key]) {
              return pmtRoute;
            }
          }
      }
      return null;
    });
  }

  add(pmtRoute: PmtRoute) {
    this.pmtRoutes.push(pmtRoute);
  }

  delete(pmtRoute: PmtRoute) {
    this.pmtRoutes.splice(this.pmtRoutes.indexOf(pmtRoute), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getPmtRoute(queryString).pipe(
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
