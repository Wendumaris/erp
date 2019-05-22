import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rating, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Ratings {

  ratings: Rating[] = [];

  constructor(private apiService: ApiService) {
    const ratings = []; // Initial Values
    for (const rating of ratings) {
      this.ratings.push(new Rating(rating));
    }
    // this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.ratings;
    }
    return this.ratings.filter((rating) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = rating[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return rating;
            } else if (field === params[key]) {
              return rating;
            }
          }
      }
      return null;
    });
  }

  add(rating: Rating) {
    this.ratings.push(rating);
  }

  delete(rating: Rating) {
    this.ratings.splice(this.ratings.indexOf(rating), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getRating(queryString).pipe(
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
    const proRes = this.apiService.postRating(data).pipe(
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

  async recordUpdate(rating: Rating, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateRating(rating.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(rating);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(rating: Rating, payload): Promise<ApiResponse> {
    const proRes = this.apiService.deleteRating(rating.id).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(rating);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
