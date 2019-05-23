import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AdminLayoutRoutes } from './admin-layout.routing';


import { BankRegisterComponent } from '../../pages/bank-register/bank-register.component';
import { BankRegisterAddComponent } from '../../pages/bank-register/bank-register-add/bank-register-add.component';
import { BankRegisterEditComponent } from '../../pages/bank-register/bank-register-edit/bank-register-edit.component';
import { BankRegisterDetailComponent } from '../../pages/bank-register/bank-register-detail/bank-register-detail.component';

import { CustomerComponent } from '../../pages/customer/customer.component';
import { CustomerAddComponent } from '../../pages/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from '../../pages/customer/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from '../../pages/customer/customer-detail/customer-detail.component';

import { DriverComponent } from '../../pages/driver/driver.component';
import { DriverDetailComponent } from '../../pages/driver/driver-detail/driver-detail.component';

import { NotificationComponent } from '../../pages/notification/notification.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { StaffComponent } from '../../pages/staff/staff.component';
import { StaffDetailComponent } from '../../pages/staff/staff-detail/staff-detail.component';

import { CityComponent } from '../../pages/city/city.component';
import { CountyComponent } from '../../pages/county/county.component';
import { StateComponent } from '../../pages/state/state.component';

import { MessageComponent } from '../../pages/message/message.component';
import { MessageAddComponent } from '../../pages/message/message-add/message-add.component';
import { MessageDetailComponent } from '../../pages/message/message-detail/message-detail.component';

import { SettingComponent } from '../../pages/setting/setting.component';
import { SettingDetailComponent } from '../../pages/setting/setting-detail/setting-detail.component';

import { VehicleComponent } from '../../pages/vehicle/vehicle.component';
import { VehicleDetailComponent } from '../../pages/vehicle/vehicle-detail/vehicle-detail.component';

import { PmtBookingComponent } from '../../pages/pmt-booking/pmt-booking.component';
import { PmtBookingDetailComponent } from '../../pages/pmt-booking/pmt-booking-detail/pmt-booking-detail.component';

import { PmtRouteComponent } from '../../pages/pmt-route/pmt-route.component';
import { PmtRouteDetailComponent } from '../../pages/pmt-route/pmt-route-detail/pmt-route-detail.component';

import { PmtWaybillComponent } from '../../pages/pmt-waybill/pmt-waybill.component';
import { PmtWaybillDetailComponent } from '../../pages/pmt-waybill/pmt-waybill-detail/pmt-waybill-detail.component';

import { PmtScheduleComponent } from '../../pages/pmt-schedule/pmt-schedule.component';
import { PmtReservationComponent } from '../../pages/pmt-reservation/pmt-reservation.component';
import { PmtReservationDetailComponent } from '../../pages/pmt-reservation/pmt-reservation-detail/pmt-reservation-detail.component';

import { PmtBoardingComponent } from '../../pages/pmt-boarding/pmt-boarding.component';

import { AuthService, ApiService, AuthGuard, EnvService, JwtInterceptor, ErrorInterceptor } from '../../services';
import { Customers, Drivers, Staffs, States, Cities, Counties, Vehicles,
  PmtBoardings, PmtBookings, PmtReservations, PmtRoutes, PmtSchedules,
  PmtWaybills, Ratings, BankRegisters, Messages, Notifications, Settings } from '../../providers';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    NgSelectModule,
  ],
  declarations: [
    BankRegisterComponent, BankRegisterAddComponent,
    BankRegisterEditComponent, BankRegisterDetailComponent,

    UserProfileComponent,
    CustomerComponent, CustomerAddComponent,
    CustomerEditComponent, CustomerDetailComponent,
    DriverComponent, DriverDetailComponent,
    StaffComponent, StaffDetailComponent,

    CityComponent, CountyComponent, StateComponent,
    SettingComponent, SettingDetailComponent,
    VehicleComponent, VehicleDetailComponent,

    PmtBoardingComponent,
    PmtBookingComponent, PmtBookingDetailComponent,
    PmtRouteComponent, PmtRouteDetailComponent,
    PmtWaybillComponent, PmtWaybillDetailComponent,
    PmtScheduleComponent,
    PmtReservationComponent, PmtReservationDetailComponent,

    MessageComponent, MessageDetailComponent, MessageAddComponent,
    NotificationComponent,
  ],
  providers: [
    AuthService,
    ApiService,
    AuthGuard,
    EnvService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    BankRegisters, Customers, Drivers, Staffs, States, Cities, Counties,
    PmtBoardings, PmtBookings, PmtReservations, PmtRoutes, PmtSchedules,
    PmtWaybills, Ratings, Vehicles, Messages, Notifications,

  ]
})

export class AdminLayoutModule {}
