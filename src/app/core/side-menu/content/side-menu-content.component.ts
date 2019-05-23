import { Component, ViewEncapsulation, OnInit } from '@angular/core';


declare interface RouteInfo {
  path: string;
 title: string;
  icon: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/customer',            title: 'Customers',           icon: 'fa fa-users' },
  { path: '/pmt-boarding',        title: 'PMT Boardings',       icon: 'fa fa-bell-o', },
  { path: '/pmt-reservation',     title: 'PMT Reservations',    icon: 'fa fa-calendar-check-o', },
  { path: '/pmt-waybill',         title: 'PMT Waybills',        icon: 'fa fa-fax', },
  { path: '/pmt-schedule',        title: 'PMT Schedules',       icon: 'fa fa-clock-o', },
  { path: '/pmt-route',           title: 'PMT Routes',          icon: 'fa fa-road', },
  { path: '/bank-register',       title: 'Bank Register',       icon: 'fa fa-bank', },
  { path: '/driver',              title: 'Drivers',             icon: 'fa fa-wheelchair', },
  { path: '/staff',               title: 'Staffs',              icon: 'fa fa-users', },
  { path: '/city',                title: 'Cities',              icon: 'fa fa-map-marker', },
  { path: '/state',               title: 'States',              icon: 'fa fa-map-o', },
  { path: '/county',              title: 'Counties',            icon: 'fa fa-map-signs', },
  { path: '/vehicle',             title: 'Vehicles',            icon: 'fa fa-bus', },
  { path: '/message',             title: 'Messages',            icon: 'fa fa-envelope', },
  { path: '/user-profile',        title: 'User Profile',        icon: 'fa fa-user-secret', },
  { path: '/setting',             title: 'Settings',            icon: 'fa fa-gears', },
];

@Component({
  selector: 'app-side-menu-content',
  styleUrls: [
    './styles/side-menu-content.scss'
  ],
  templateUrl: './side-menu-content.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class SideMenuContentComponent  implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
