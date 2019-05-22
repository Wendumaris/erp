export class Notification {
    id: string;
    title: string;
    status: string;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Notification {
    [prop: string]: any;
}
