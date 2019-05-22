import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Setting, ApiResponse } from '../../models';
import { ApiService } from '../../services';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {
  private SETTINGS_KEY: string = '_settings';

  settings: Setting[] = [];

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(private apiService: ApiService,
    public storage: Storage, defaults: any) {
      this._defaults = defaults;
    const settings = []; // Initial Values
    for (const setting of settings) {
      this.settings.push(new Setting(setting));
    }
    // this.recordRetrieve();
  }

  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }

  query(params?: any) {
    if (!params) {
      return this.settings;
    }
    return this.settings.filter((setting) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = setting[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return setting;
            } else if (field === params[key]) {
              return setting;
            }
          }
      }
      return null;
    });
  }

  add(setting: Setting) {
    this.settings.push(setting);
  }

  delete(setting: Setting) {
    this.settings.splice(this.settings.indexOf(setting), 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getSetting(queryString).pipe(
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
