import { Injectable } from '@angular/core';
import { Terminal, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import TerminalData from './table';

@Injectable()
export class Terminals {

  terminals: Array<any> = [];

  constructor(public api: ApiService) {
    const records: Array<Terminal> = TerminalData;
    for (const item of records) {
      this.terminals.push(new Terminal(item));
    }

    // this.getTerminals();
  }

  query(params?: any) {
    if (!params) {
      return this.terminals;
    }
    return this.terminals.filter((terminal) => {
      for (const key in params) {
        const field = terminal[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return terminal;
        } else if (field == params[key]) {
          return terminal;
        }
      }
      return null;
    });
  }

  add(terminal: Terminal) {
    this.terminals.push(terminal);
  }

  delete(terminal: Terminal) {
    this.terminals.splice(this.terminals.indexOf(terminal), 1);
  }

  async getTerminals() {
    await this.api.getTerminal('').subscribe((res: ApiResponse) => {
      if (res.success && res.payload.length > 0) {
          const terminals = res.payload.map((record, index) => {
            const obj = Object.assign({}, record);
            obj.image = this.api.getImageUrl(record.image);
            return obj;
          });
          for (const terminal of terminals) {
            this.terminals.push(new Terminal(terminal));
          }
        }
      }, err => {
        console.log(err);
      });
  }
}
