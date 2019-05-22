export class City {
    id: string;
    name: string;
    state_id: string;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface City {
    [prop: string]: any;
}
