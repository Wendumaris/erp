export class Offence {
    id: string;
    offender_type: string;
    offender_id: string;
    offence: string;
    offence_date: Date;
    description: string;
    offence_status: string;
    verdict: string;
    verdict_by: string;
    verdict_date: Date;
    verdict_remark: string;
    fine: number;
    discipline: string;
    suspension: string;
    payment: string;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Offence {
    [prop: string]: any;
}

