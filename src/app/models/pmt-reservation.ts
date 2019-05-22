import { Customer } from './customer';
import { PmtSchedule } from './pmt-schedule';
import { PmtRoute } from './pmt-route';

export class PmtReservation {
    id: string;
    description: string;
    transaction_code: string;
    customer_id: Customer;
    pmt_schedule_id: any;
    pmt_route_id: PmtRoute;
    seat_quantity: number;
    seat_positions: [];
    payment_method: string;
    payment_gateway: string;
    payment_status: string;
    reservation_status: string;
    flutterwave_transaction: {
        flwId: number,
        amount: number,
        charged_amount: number,
        txRef: string,
        flwAccountId: number,
        flwCustomerId: number,
        currency: string,

    };
    customer: Customer;
    pmt_route: PmtRoute;
    pmt_schedule: PmtSchedule;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface PmtReservation {
    [prop: string]: any;
}

