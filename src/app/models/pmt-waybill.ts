import { PmtBoarding } from './pmt-boarding';
import { PmtRoute } from './pmt-route';
import { PmtSchedule } from './pmt-schedule';
import { Terminal } from './terminal';
import { Driver } from './driver';
import { Vehicle } from './vehicle';
import { Staff } from './staff';

export class PmtWaybill {
    id: string;
    pmt_schedule_id: PmtSchedule;
    terminal_id: Terminal;
    driver_id: Driver;
    vehicle_id: Vehicle;
    pmt_route_id: PmtRoute;
    pmt_boarding_ids: PmtBoarding;
    fare_payable: Number;
    fare_total: Number;
    fuel_amount: Number;
    driver_allowance: Number;
    is_dto: Boolean;
    dto_maintenance: Number;
    dto_repayment: Number;
    dto_service_charge: Number;
    departure_date: Date;
    remark: string;
    is_authorized: Boolean;
    authorized_by: Staff;
    authorized_date: Date;
    boarding_status: string;
    created_by: object;
    updated_by: object;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface PmtWaybill {
    [prop: string]: any;
}

