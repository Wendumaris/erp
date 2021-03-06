﻿export class Message {
    id: string;
    sender: string;
    title: string;
    phone: string;
    email: string;
    status: string;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Message {
    [prop: string]: any;
}
