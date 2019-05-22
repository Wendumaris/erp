import { Terminal } from './terminal';

export class PmtRoute {
    id: string;
    name: string;
    terminal1_id: Terminal;
    terminal2_id: Terminal;
    category: string;
    fare_class1: number;
    fare_class2: number;
    fuel_litres_class1: number;
    fuel_litres_class2: number;
    distance: number;
    driver_allowance: number;
    duration: number;
    trips: number;
    is_reservable: boolean;
    is_available: boolean;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface PmtRoute {
    [prop: string]: any;
}

