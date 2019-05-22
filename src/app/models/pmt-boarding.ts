import { PmtRoute } from './pmt-route';
import { Customer } from './customer';
import { PmtWaybill } from './pmt-waybill';
import { PmtSchedule } from './pmt-schedule';
import { PmtReservation } from './pmt-reservation';

export class PmtBoarding {
  id: string;
  pmt_waybill_id: PmtWaybill; // waybill Object
  pmt_schedule_id: PmtSchedule; // Schedule Object
  pmt_reservation_id: PmtReservation; // Reservation Object
  pmt_route_id: PmtRoute;
  customer_id: Customer; // Customer Object
  transaction_code: string;
  payment_status: string;
  payment_method: string;
  payment_gateway: string;
  seat_quantity: number;
  seat_positions: [];
  fare: number;
  destination: string;
  boarding_status: string;

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
        // @ts-ignore
        this[f] = fields[f];
    }
}

}

export interface PmtBoarding {
[prop: string]: any;
}

