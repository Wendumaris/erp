import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Messages {

  messages: Message[] = [];

  constructor(private apiService: ApiService) {
    const messages = []; // Initial Values
    for (const message of messages) {
      this.messages.push(new Message(message));
    }
    // this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.messages;
    }
    return this.messages.filter((message) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = message[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return message;
            } else if (field === params[key]) {
              return message;
            }
          }
      }
      return null;
    });
  }

  add(message: Message) {
    this.messages.push(message);
  }

  delete(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getMessage(queryString).pipe(
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
    const proRes = this.apiService.postMessage(data).pipe(
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

  async recordUpdate(message: Message, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateMessage(message.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(message);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
