import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PmtBooking {

  responseData: any;
  freq = 4; // Frequency of update in Hours
  lastUpdate = new Date('2018-02-02T00:00:00');

  // booking stages
  private stageData = { 'initialize': false, 'login': false, 'choose': false, 'schedule': false, 'trip': false, 'payment': false };

  public gotoPage = 'WelcomePage'; // gotoPage BookingPage, ProfilePage, WelcomePage

  /*** BOOKING SETTINGS
   * The Settings should load automatically as soon as the app is laoded.
   * The control value of booking has 3 states: OFFLINE | DUMMY | SCHEDULE
   * By default, the  control value of booking is OFFLINE
   * Only the first control is implemented. fare, discount and taxt is for later
   * Use the accessors setSettings and getSettings() to acces them
   * To get the control parameter of a settings mode, use getSettingsControl(name)
   ***/

  // private settingsData: Array<{ id: string, name: string, control: string }>;
  private settingsData: Array<{ id: string, name: string, control: string }> = [
    { 'id': '1', 'name': 'BOOKING', 'control': 'OFFLINE' },
    { 'id': '2', 'name': 'BOOKING_FARE', 'control': 'FARE1' },
    { 'id': '3', 'name': 'BOOKING_DISC', 'control': '10' },
    { 'id': '4', 'name': 'TAX', 'control': '10' }
  ];


  // UserData from Storage
  private userData = {
    'id': '',
    'token': '',
    'surname': '',
    'other_name': '',
    'sex': '',
    'birth_date': '',
    'phone': '',
    'phone2': '',
    'email': '',
    'password': '',
    'person': '',
    'person_phone': '',
    'product': '',
    'address': '',
    'city': '',
    'state': ''
  };

  // Stored Schedule Data
  // private scheduleData: Array<{ id: string, route: number, departure: string, fare: number, seat: string, seaters: string   }>;
  private scheduleData = [{ 'id': '', 'route': 0, 'departure': '', 'fare': 0, 'seat': '', 'seaters': 16 }];

  // Booking Data bookingData
// tslint:disable-next-line: max-line-length
  private bookingData = { 'customer': 0, 'route': 0, 'terminal1': '', 'terminal2': '', 'departure': '', 'schedule': 0, 'seats': 0, 'seat': '', 'fare': 0, 'mode': 'OFFLINE', 'method': '', 'transcode': '', 'respcode': '', 'pay_status': 'NOT_PAID' };

  // private terminals: Array<{ id: number, name: string, address: string, latitude: number, longitude: number, pmtonline: string }>;
  private terminals = [];


  constructor() {


  }


  settingDetails(settingName) {
    for (let i = 0; i < this.settingsData.length; i++) {
      // This if statement depends on the format of your array
      if (this.settingsData[i]['name'] == settingName) {
        return this.settingsData[i];   // Found it
      }
    }
  }



  getTerminal(terminalId) {
    for (let i = 0; i < this.terminals.length; i++) {
      // This if statement depends on the format of your array
      if (this.terminals[i]['id'] == terminalId) {
        return this.terminals[i];   // Found it
      }
    }
  }


  terminalName(terminalId) {
    const terminalMuiltiArray = this.terminals;
    for (let i = 0; i < terminalMuiltiArray.length; i++) {
      // This if statement depends on the format of your array
      if (terminalMuiltiArray[i]['id'] == terminalId) {
        return terminalMuiltiArray[i]['name'];   // Found it
      }
    }
  }

  /** Assessors */

  // Settings
  public getSettings() {
    return this.settingsData;
  }

  // store the settings parameters //
  public setSettings(settingsData) {
    this.settingsData = settingsData;
    console.log('settingsData ', JSON.stringify(this.settingsData));
  }

  // store the settings parameters //
  public storeSettings(settingsData) {
    localStorage.setItem('settingsData', JSON.stringify(settingsData));
  }

  // get a settings control value give settings name
  public settingsControl(settingsName: string): string {
    const settingsMuiltiArray = this.getSettings();
    for (let i = 0; i < settingsMuiltiArray.length; i++) {
      // This if statement depends on the format of your array
      if (settingsMuiltiArray[i]['name'] == settingsName) {
        return settingsMuiltiArray[i]['control'];   // Found it
      }
    }
  }

  // Booking Stage
  public getStage() {
    return this.stageData;
  }

  public setStage(stageData) {
    this.stageData = stageData;
    console.log(JSON.stringify(this.stageData));
  }

  public storeStage(stageData) {
    localStorage.setItem('stageData', JSON.stringify(stageData));
  }

  public restore(data: string) {
    if (localStorage.getItem(data)) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return false;
    }
  }

  public store(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  // User Data
  public getUserData() {
    return this.userData;
  }

  public setUserData(userData) {
    this.userData = userData;
    console.log(JSON.stringify(this.userData));
  }

  // Terminal
  public getTerminals() {
    return this.terminals;
  }

  // Scheduling
  public getScheduleData() {
    return this.scheduleData;
  }

  public setScheduleData(scheduleData) {
    this.scheduleData = scheduleData;
  }

  public storeScheduleData(scheduleData) {
    localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
  }

  // convert Set to String
  public setToString(mySet): string {
    let setStr: string;
    if (typeof mySet == 'string') {
      setStr = mySet;
    } else {
      const setArr = Array.from(mySet);
      setStr = setArr.toString();
    }
    return setStr;
  }

  public stringToSet(str) {
    str = str.replace(/\s+/g, '');
    const sArray = str.split(','); // Array ["1","2","3","4","5"]
    const tArray = new Array();
    for (const a in sArray ) {
        tArray[a] = parseInt(tArray[a], 10); // Explicitly include base [1,2,3,4,5]
    }
    // return new Set(tArray);
    return new Set(sArray);
  }

  public getBookingData() {
    return this.bookingData;
  }

  public setBookingData(bookingData) {
    this.bookingData = bookingData;
    this.store('bookingData', bookingData);
  }

}
