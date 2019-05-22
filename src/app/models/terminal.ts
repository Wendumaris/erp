import { City } from './city';
import { County } from './county';
import { FlutterwaveSubaccount } from './flutterwave-subaccount';

export class Terminal {
    id: string;
    name: string;
    manager: string;
    phone: string;
    quarter: string;
    city_id: City;
    county_id: County;
    address: string;
    longitude: number;
    latitude: number;
    capacity: number;
    is_pml_operational: boolean;
    is_pmt_operational: boolean;
    is_pmt_online: boolean;
    photo: string;
    flw_subaccount_id: FlutterwaveSubaccount;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Terminal {
    [prop: string]: any;
}
