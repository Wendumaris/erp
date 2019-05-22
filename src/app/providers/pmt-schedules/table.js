import { toObjectId, DATABASE } from "../../helpers";

/**
 * @description Recurring dummy data for unschecduled booking.
 * The data is automatically set and seats are only choosen when the
 * traveller arrives at the Terminal priori to the departure.
 */
const table = [];

const countyBaseId = DATABASE.BASE_ID.COUNTY;
const stateBaseId = DATABASE.BASE_ID.STATE;
const cityBaseId = DATABASE.BASE_ID.CITY;
const staffBaseId = DATABASE.BASE_ID.STAFF;
const terminalBaseId = DATABASE.BASE_ID.TERMINAL;
const bankAccountBaseId = DATABASE.BASE_ID.BANK_ACCOUNT;

const result = table.map((record, index) => {
    const obj = Object.assign({}, record);
    obj._id = toObjectId(terminalBaseId, 1 + index);
    if (record.flw_subaccount_id) {
        obj.flw_subaccount_id = toObjectId(bankAccountBaseId, record.flw_subaccount_id);
    } else {
        delete obj.flw_subaccount_id;
    }
    obj.county_id = toObjectId(countyBaseId, record.county_id);
    obj.state_id = toObjectId(stateBaseId, record.state_id);
    obj.city_id = toObjectId(cityBaseId, record.city_id);
    obj.created_by = toObjectId(staffBaseId, record.created_by);
    return obj;
});

export default result;
