import { PmtRoute } from './pmt-route';
import { PmtWaybill } from './pmt-waybill';
import { Vehicle } from './vehicle';

export class PmtSchedule {
    id: string;
    name: string;
    vehicle_id: Vehicle;
    pmt_route_id: PmtRoute;
    departure_date: Date;
    schedule_status: string;
    is_reservable: boolean;
    pmt_waybill_id: PmtWaybill;
    pmt_reservation_ids: Array<object>;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface PmtSchedule {
    [prop: string]: any;
}
